"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart } from "@/types";
import { MoveRight, ArrowRight, Loader, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { round2 } from "@/lib/utils";

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();

  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  return (
    <>
      <h1 className="h2-bold py-4">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty.{" "}
          <Link href="/" className="inline-flex items-center font-bold">
            Go Shopping <MoveRight className="ml-1" />
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => {
                  const isRowPending = loadingItemId === item.productId;

                  return (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell className="flex-center gap-2">
                        <Button
                          disabled={isRowPending}
                          variant="outline"
                          type="button"
                          onClick={() => {
                            setLoadingItemId(item.productId);
                            startTransition(async () => {
                              const res = await removeItemFromCart(
                                item.productId,
                              );

                              if (!res.success) {
                                toast({
                                  variant: "destructive",
                                  description: res.message,
                                });
                              }

                              setLoadingItemId(null);
                            });
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="flex w-8 items-center justify-center">
                          {isRowPending ? (
                            <Loader className="h-4 w-4 animate-spin" />
                          ) : (
                            item.qty
                          )}
                        </div>
                        <Button
                          disabled={isRowPending}
                          variant="outline"
                          type="button"
                          onClick={() => {
                            setLoadingItemId(item.productId);
                            startTransition(async () => {
                              const res = await addItemToCart(item);

                              if (!res.success) {
                                toast({
                                  variant: "destructive",
                                  description: res.message,
                                });
                              }

                              setLoadingItemId(null);
                            });
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.price}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default CartTable;
