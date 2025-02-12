"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";

import { useRouter } from "next/navigation";
import { Loader, Minus, Plus } from "lucide-react";
import { Cart, CartItem } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      // Handle failure add to cart
      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
        return;
      }

      // Handle success add to cart
      toast({
        description: res.message,
        action: (
          <ToastAction
            className="bg-primary text-white hover:bg-gray-800"
            altText="Go To Cart"
            onClick={() => router.push("/cart")}
          >
            Go To Cart
          </ToastAction>
        ),
      });
    });
  };

  // Handle remove from cart

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast({
        variant: res.success ? "default" : "destructive",
        description: res.message,
      });

      return;
    });
  };

  // Check if items is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div className="flex items-center space-x-2">
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        <Minus className="h-4 w-4" />
      </Button>
      <div className="flex w-8 items-center justify-center">
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          existItem.qty
        )}
      </div>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <Button className="w-full" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}{" "}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
