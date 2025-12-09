"use client";

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { useContext } from "react";

// interface CartBannerProps {
//   restaurant: Pick<Restaurant, "id">;
// }

const CartBanner = () => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    isCartOpen,
    openCart,
    closeCart,
    products,
    totalPrice,
    totalQuantity,
  } = useContext(CartContext);
  // const restaurantHasProductsOnCart = products.some(
  //   (product) => product.restaurantId === FEATURED_RESTAURANT_ID,
  // );
  //if (pathname.startsWith("/products")) return null
  if (products.length === 0) return null;
  //if (!restaurantHasProductsOnCart) return null;
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-solid  border-muted bg-[#cbcbcb] p-2 shadow-lg">
      <div className="flex items-center justify-between">
        {/*  PREÇO */}
        <div>
          <span className="text-xs text-secondary-foreground">
            Total sem entrega
          </span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}
            {""}
            <span className="text-xs font-normal text-muted-foreground">
              {""}/ {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
            </span>
          </h3>
        </div>

        <Button size={"sm"} className="bg-tematic text-xs" onClick={openCart}>
          Ver sacola
        </Button>

        <Sheet
          open={isCartOpen}
          onOpenChange={(open) => (open ? openCart() : closeCart())}
        >
          <SheetContent className="w-[90vw]">
            <SheetHeader>
              <SheetTitle className="text-left">Sacola</SheetTitle>
            </SheetHeader>
            <Cart setIsOpen={openCart} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CartBanner;
