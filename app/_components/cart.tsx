import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import { useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

import { Icons } from "./icons";
import { useRouter } from "next/navigation";

interface CartProps {
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({ setIsOpen }: CartProps) => {
  const router = useRouter();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const { data } = useSession();
  const tempOrderId = crypto.randomUUID();

  const { products, subtotalPrice, totalPrice, totalDiscounts } =
    useContext(CartContext);

  const isUserAuthenticated = async () => {
    if (!data?.user) {
      setIsLoginDialogOpen(true);
      return;
    }
    setIsSubmitLoading(true);
    router.push(`/checkout-payment?order=${tempOrderId}`);
  };

  const handleContinueShoppingClick = () => {
    setIsOpen(false);

    router.push("/");
  };

  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length > 0 ? (
          <>
            <div className="flex-auto space-y-4">
              {products.map((product) => (
                <CartItem key={product.id} cartProduct={product} />
              ))}
            </div>

            {/* TOTAIS */}
            <div className="mt-6">
              <Card>
                <CardContent className="space-y-2 p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotalPrice)}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Descontos</span>
                    <span>- {formatCurrency(totalDiscounts)}</span>
                  </div>

                  <Separator className="h-[0.5px]" />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Entrega</span>

                    {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                      <span className="uppercase text-primary">Grátis</span>
                    ) : (
                      formatCurrency(
                        Number(products?.[0].restaurant.deliveryFee),
                      )
                    )}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FINALIZAR PEDIDO */}
            <Button
              className="mt-6 w-full bg-tematic hover:bg-tematic/90"
              onClick={() => setIsConfirmDialogOpen(true)}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin text-white" />
                  Finalizando...
                </>
              ) : (
                "Finalizar Pedido"
              )}
            </Button>
          </>
        ) : (
          <h2 className="text-left font-medium">Sua sacola está vazia.</h2>
        )}
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Deseja finalizar seu pedido?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center"></AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex gap-2 sm:justify-center md:justify-center lg:justify-center">
            <AlertDialogCancel className="mt-0">Cancelar</AlertDialogCancel>

            <Button
              className="gap-2 border border-input"
              onClick={handleContinueShoppingClick}
              variant="secondary"
            >
              Continuar Comprando
            </Button>

            <AlertDialogAction
              onClick={isUserAuthenticated}
              disabled={isSubmitLoading}
              className="bg-tematic "
            >
              {isSubmitLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {" "}
              Você precisa estar logado para continuar.
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex gap-2 sm:justify-center md:justify-center lg:justify-center">
            <AlertDialogCancel className="mt-0 w-full md:w-24">
              Cancelar
            </AlertDialogCancel>

            <AlertDialogAction
              className="w-full bg-tematic text-white hover:bg-tematic/90 md:w-24"
              onClick={() => router.push("/login")}
            >
              Login
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
