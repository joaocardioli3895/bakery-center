"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

import ConditionalSearch from "./ConditionalSearch";
import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";

const Header = () => {
  const { data } = useSession();
  const { openCart } = useContext(CartContext);

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();
  const [openSheet, setOpenSheet] = useState<"cart" | "menu" | null>(null);

  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between rounded-lg bg-white px-5 py-2 shadow-sm">
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        >
          <div className="relative h-[30px] w-[100px]">
            <Image
              src="https://cdn.outback.com.br/wp-data/wp-content/themes/outback_2022/assets/images/outback-logo.png"
              alt="FSW Foods"
              sizes="100%"
              fill
              className="object-cover"
            />
          </div>
        </Link>

        <ConditionalSearch />
        <div className="ml-auto flex items-center gap-3">
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
            onClick={openCart}
          >
            <ShoppingBag className="w-6 text-gray-950 text-opacity-30" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
            onClick={() => setOpenSheet("menu")}
          >
            <MenuIcon />
          </Button>

          <div className="flex items-center gap-2">
            {/* 🧾 Sheet dinâmico */}
            <Sheet open={!!openSheet} onOpenChange={() => setOpenSheet(null)}>
              <SheetContent>
                {openSheet === "cart" && (
                  <>
                    <SheetHeader>
                      <SheetTitle className="text-left">Carrinho</SheetTitle>
                      <SheetDescription>Carrinho vazio</SheetDescription>
                    </SheetHeader>

                    <div className="pt-6">
                      <h1>Vazio</h1>
                    </div>
                  </>
                )}

                {openSheet === "menu" && (
                  <>
                    <SheetHeader>
                      <SheetTitle className="text-left">Menu</SheetTitle>
                    </SheetHeader>

                    {/* Usuário logado */}
                    {data?.user ? (
                      <div className="flex justify-between pt-6">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={data.user.image ?? undefined} />
                            <AvatarFallback>
                              {data.user.name &&
                                data.user.name.split(" ")[0][0]}
                              {data.user.name &&
                              data.user.name.split(" ").length > 1
                                ? data.user.name.split(" ")[1][0]
                                : ""}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{data.user.name}</h3>
                            <span className="block text-xs text-muted-foreground">
                              {data.user.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Usuário deslogado
                      <div className="flex items-center justify-between pt-10">
                        <h2 className="font-semibold">Olá. Faça seu login!</h2>
                        <Button size="icon" onClick={handleSignInClick}>
                          <LogInIcon />
                        </Button>
                      </div>
                    )}

                    <div className="py-6">
                      <Separator />
                    </div>

                    {/* Navegação */}
                    <div className="space-y-2">
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                      >
                        <Link href="/">
                          <HomeIcon size={16} />
                          <span className="block">Início</span>
                        </Link>
                      </Button>

                      {data?.user && (
                        <>
                          <Button
                            variant="ghost"
                            className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                            asChild
                          >
                            <Link href="/my-orders">
                              <ScrollTextIcon size={16} />
                              <span className="block">Meus Pedidos</span>
                            </Link>
                          </Button>

                          <Button
                            variant="ghost"
                            className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                            asChild
                          >
                            <Link href="/my-favorite-restaurants">
                              <HeartIcon size={16} />
                              <span className="block">
                                Restaurantes Favoritos
                              </span>
                            </Link>
                          </Button>
                        </>
                      )}
                    </div>

                    <div className="py-6">
                      <Separator />
                    </div>

                    {data?.user && (
                      <Button
                        variant="ghost"
                        className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                        onClick={handleSignOutClick}
                      >
                        <LogOutIcon size={16} />
                        <span className="block">Sair da conta</span>
                      </Button>
                    )}
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
          {/* <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="border-none bg-transparent "
              >
                <ShoppingBag className="w-6 text-gray-950 text-opacity-30" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
              {data?.user ? (
                <>
                  <div>
                    <h1>Vazio</h1>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h1>Vazio</h1>
                  </div>
                </>
              )}
                <SheetTitle className="text-left">Carrinho</SheetTitle>
                <SheetDescription> Carrinho Vazio</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="border-none bg-transparent"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>

              {data?.user ? (
                <>
                  <div className="flex justify-between pt-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={data?.user?.image as string | undefined}
                        />
                        <AvatarFallback>
                          {data.user.name && data.user.name.split(" ")[0][0]}
                          {data.user.name &&
                          data.user.name.split(" ").length > 1
                            ? data.user.name.split(" ")[1][0]
                            : ""}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">{data?.user?.name}</h3>
                        <span className="block text-xs text-muted-foreground">
                          {data?.user?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between pt-10">
                    <h2 className="font-semibold">Olá. Faça seu login!</h2>
                    <Button size="icon" onClick={handleSignInClick}>
                      <LogInIcon />
                    </Button>
                  </div>
                </>
              )}

              <div className="py-6">
                <Separator />
              </div>

              <div className="space-y-2">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                >
                  <Link href="/">
                    <HomeIcon size={16} />
                    <span className="block">Início</span>
                  </Link>
                </Button>

                {data?.user && (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                      asChild
                    >
                      <Link href="/my-orders">
                        <ScrollTextIcon size={16} />
                        <span className="block">Meus Pedidos</span>
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                      asChild
                    >
                      <Link href="/my-favorite-restaurants">
                        <HeartIcon size={16} />
                        <span className="block">Restaurantes Favoritos</span>
                      </Link>
                    </Button>
                  </>
                )}
              </div>

              <div className="py-6">
                <Separator />
              </div>

              {data?.user && (
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  onClick={handleSignOutClick}
                >
                  <LogOutIcon size={16} />
                  <span className="block">Sair da conta</span>
                </Button>
              )}
            </SheetContent>
          </Sheet> */}
        </div>
      </div>
      <Separator className="hidden  md:block" />
    </>
  );
};

export default Header;
