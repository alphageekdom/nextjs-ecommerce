"use client";

import { useToast } from "@/hooks/use-toast";
import { Cart } from "@/types";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();

  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();
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
          <div className="overflow-x-auto md:col-span-3">Table</div>
        </div>
      )}
    </>
  );
};

export default CartTable;
