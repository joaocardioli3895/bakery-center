"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
  className?: string;
}

export const ProductFeatured = ({ product, className }: ProductItemProps) => {
  return (
    <Link
      className={cn("w-[150px] min-w-[150px]", className)}
      href={`/products/${product.id}`}
    >
      <div className="space flex w-full gap-3 sm:flex sm:flex-row sm:items-end sm:gap-2">
        <div className="relative aspect-square min-h-[100px] min-w-[100px] sm:h-[90px] sm:w-[90px]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-md object-cover shadow-md"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="items-start -space-y-1 sm:justify-end">
            <div className="flex flex-col justify-start">
              {product.discountPercentage && (
                <div className="flex max-w-12 items-center justify-center rounded-full bg-primary text-white">
                  <span className="flex p-1 text-xs font-semibold">
                    <ArrowDownIcon size={15} />
                    {product.discountPercentage}%
                  </span>
                </div>
              )}
              <h2 className="block overflow-hidden text-ellipsis whitespace-nowrap text-base sm:text-base lg:text-xl">
                {product.name}
              </h2>
            </div>

            <div className="-space-y-1">
              <h3 className="-mb-2 font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h3>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(Number(product.price))}
                </span>
              )}
              <span className="block text-xs text-muted-foreground">
                {product.restaurant.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
