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
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

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
                  <TableHead>Item(s)</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-center">Price</TableHead>
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
                        {formatCurrency(item.price)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <Card>
            <CardContent className="gap-4 p-4">
              <div className="flex justify-between pb-3 text-xl">
                Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):
                <span className="font-bold">
                  {formatCurrency(cart.itemsPrice)}
                </span>
              </div>
              <Button
                className="w-full"
                disabled={isPending}
                onClick={() =>
                  startTransition(() => router.push("/shipping-address"))
                }
              >
                {isPending ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}{" "}
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CartTable;
