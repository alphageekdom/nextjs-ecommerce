import Link from "next/link";
import Image from "next/image";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";

import { Product } from "@/types";
import Rating from "./rating";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="border-2 border-slate-600">
      <CardHeader>
        <Link
          href={`/product/${product.slug}`}
          className="flex flex-col items-center"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className="grid gap-4 p-4">
        <div className="text-xs italic">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm font-medium">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
          <Rating value={Number(product.rating)} />
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className="text-destructive">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
