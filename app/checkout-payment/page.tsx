"use client";
import {
  MapPin,
  Tag,
  QrCode,
  CreditCard,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Header from "../_components/header";
import { Button } from "../_components/ui/button";
import { Card } from "../_components/ui/card";
import { Label } from "@radix-ui/react-label";
import { useContext, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { RadioGroupItem, RadioGroup } from "../_components/ui/radio-group";
import { Input } from "../_components/ui/input";
import { CartContext } from "../_context/cart";
import { formatCurrency } from "../_helpers/price";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useThreeDS } from "./hooks/three-ds";
import { Icons } from "../_components/icons";
import { createOrder } from "../_components/_actions/order";
import { Prisma } from "@prisma/client";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"

// type CheckoutData = {
//   amount: number;
//   items: Array<{
//     title: string;
//     unitPrice: number;
//     quantity: number;
//     tangible: boolean;
//   }>;
//   customer: {
//     name: string;
//     email: string;
//     phone: string;
//     document: {
//       type: "cpf" | "cnpj";
//       number: string;
//     };
//   };
// };

const CheckoutPaymentRoute = ({
  searchParams,
}: {
  searchParams: { order?: string };
}) => {
  const orderId = searchParams.order;

  if (!orderId) {
    toast("Pedido não encontrado", {
      description: "O pedido não foi encontrado",
      duration: 5000,
    });
    redirect("/");
  }
  const navigate = useRouter();

  const { products, totalPrice } = useContext(CartContext);
  const [showCardForm, setShowCardForm] = useState(false);
  const [observabilityOrder, setObservabilityOrder] = useState("");
  const { data } = useSession();
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | null>(
    null,
  );
  const { load, setKey, getSettings, injectIframe, prepare, encrypt } =
    useThreeDS();
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_BLACKCAT_PUBLIC_KEY!;
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  console.log("Subtotal:", formatCurrency(totalPrice));
  //Corrigir nome variável amount para totalPrice
  const totalPriceInCents = Math.round(Number(totalPrice) * 100);
  console.log("Total em centavos:", totalPriceInCents);
  //totalPriceInCents
  const items = products.map((p) => ({
    title: p.name,
    unitPrice: Number(p.price) * 100,
    quantity: p.quantity,
    tangible: true,
  }));

  console.log("Produtos no carrinho:", products);

  console.log("Taxa de entrega:", products?.[0]?.restaurant?.deliveryFee);

  // Address form state
  const [address, setAddress] = useState({
    street: "",
    zip: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  // Card form state
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [month, year] = cardData.expiry.split("/");
  const card = {
    number: cardData.number.replace(/\s/g, ""),
    holderName: cardData.name,
    expMonth: parseInt(month),
    expYear: parseInt(year),
    cvv: cardData.cvv,
  };

  // const handleApplyCoupon = () => {
  //   if (couponCode.trim()) {
  //     toast("Cupom aplicado!", {
  //       description: `Desconto de 10% aplicado com o cupom ${couponCode}`,
  //     });
  //   }
  // };

  const handleFinishOrder = async () => {
    if (
      !address.street ||
      !address.number ||
      !address.neighborhood ||
      !address.city ||
      !address.state
    ) {
      toast("Endereço incompleto", {
        description: "Por favor, preencha todos os campos do endereço",
        style: {
          backgroundColor: "#a00f2d",
          color: "#fff",
        },
        duration: 5000,
      });
      return;
    }

    if (!paymentMethod) {
      toast("Método de pagamento", {
        description: "Por favor, selecione um método de pagamento",
        style: {
          backgroundColor: "bg-tematic",
          color: "#fff", // texto branco
        },
        duration: 5000,
      });
      return;
    }
    //console.log(products);
    if (paymentMethod === "pix") {
      setPaymentMethod("pix");
      setIsSubmitLoading(true);

      const payload = {
        amount: totalPriceInCents,
        currency: "BRL",
        paymentMethod: "pix",
        items,
        customer: {
          name: data?.user.name,
          email: data?.user.email,
          phone: "11987654321",
          document: {
            type: "cpf",
            number: "28309788037",
          },
        },
        shipping: {
          name: data?.user.name,
          address: {
            street: address.street,
            number: address.number,
            complement: "",
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            zip: address.zip,
          },
        },
        pix: {
          expiresInDays: 1,
        },
      };

      //console.log("Payload sendo enviado:", payload);
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      //console.log("Resposta da API:", res);

      const out = await res.json();
      //console.log("Resposta da API:", out);

      const qr = out.data.paymentData.qrCode;
      const q = encodeURIComponent(qr);
      //MONTAR O PAYLOAD PARA CRIAR A ORDER INDEPENDENTE DO MÉTODO DE PAGAMENTO

      const orderPayload: Prisma.OrderCreateInput = {
        subtotalPrice: totalPriceInCents,
        totalPrice: totalPrice,
        totalDiscounts: 0,
        deliveryFee: 0,
        deliveryTimeMinutes: 40,
        street: address.street,
        number: address.number,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,

        status:
          paymentMethod.toLowerCase() === "pix" || "card"
            ? "CONFIRMED"
            : "COMPLETED",
        user: {
          connect: { id: data?.user.id || "" },
        },
        restaurant: {
          connect: { id: products[0].restaurant.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      };
      const debug = await createOrder(orderPayload);
      console.log("Order criada:", debug);
      setIsSubmitLoading(false);

      navigate.push(`/checkout-payment/pix?orderId=${orderId}&qrcode=${q}`);

      setIsSubmitLoading(false);
    } else {
      setPaymentMethod("card");
      if (
        !cardData.number ||
        !cardData.name ||
        !cardData.expiry ||
        !cardData.cvv
      ) {
        toast("Dados do cartão incompletos", {
          description: "Por favor, preencha todos os dados do cartão",
          duration: 5000,
        });
        return;
      }

      try {
        setIsSubmitLoading(true);

        await load();
        await setKey(PUBLIC_KEY);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const settings = await getSettings(PUBLIC_KEY);
        console.log("3DS Settings:", settings);

        switch (settings.threeDSSecurityType) {
          case "IFRAME":
            injectIframe(settings.iframeUrl);
            break;
          case "REDIRECT":
            break;
          case "SCRIPT":
            break;
          case "NONE":
            break;
        }
        // const amountCents = window["ShieldHelper"].convertDecimalToCents(
        //   amount,
        //   "BRL",
        // );

        console.log("amountCents:", totalPriceInCents);

        await prepare({
          amount: totalPriceInCents,
          currency: "BRL",
          installments: 1,
        });

        const token = await encrypt(card);

        const payload = {
          paymentMethod: "credit_card",
          amount: totalPriceInCents,
          currency: "BRL",
          installments: 1,
          items,
          customer: {
            name: data?.user.name,
            email: data?.user.email,
            phone: "11987654321",
            document: {
              type: "cpf",
              number: "283.097.120-65",
            },
          },
          card: {
            hash: token,
          },
        };

        console.log("Payload sendo enviado:", payload);

        const response = await fetch("/api/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        console.log("Resposta da API:", response);
        const out = await response.json();
        if (response.ok) {
          toast(
            "❌ Desculpe, Houve uma falha ao Realizar o Pagamento do Pedido! ",
            {
              description: "Houve uma falha ao Realizar o Pagamento do Pedido!",
              duration: 6000,
            },
          );
        }
        if (out?.threeDS?.redirectUrl) {
          setIsSubmitLoading(true);
          navigate.push(out.threeDS.redirectUrl);
          return;
        }

        console.log("resultado do token", token);
      } catch (error) {
        console.error("Erro ao tokenizar o cartão:", error);
      }

      // setTimeout(() => navigate.push("/"), 2000);
    }
  };
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <header className="flex justify-center ">
          <div className="sticky z-30 -mt-7 flex  h-20 w-11/12  items-end justify-center rounded-3xl bg-son px-4 py-4 shadow-lg">
            <h1 className="flex  text-xl font-bold  text-primary-foreground">
              Finalizar Pedido
            </h1>
          </div>
        </header>

        <div className="mx-auto max-w-2xl space-y-4 p-4">
          {/* Address Section */}
          <Card className="p-4 shadow-[var(--shadow-card)]">
            <div className="mb-4 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-tematic" />
              <h2 className="text-lg font-semibold">Endereço de Entrega</h2>
            </div>

            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="street">Rua</Label>
                  <Input
                    id="street"
                    placeholder="Nome da rua"
                    value={address.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                    className="mt-1 "
                  />
                </div>
                <div>
                  <Label htmlFor="number">CEP</Label>
                  <Input
                    id="cep"
                    placeholder="00000-000"
                    value={address.zip}
                    onChange={(e) =>
                      setAddress({ ...address, zip: e.target.value })
                    }
                    className="mt-1 "
                  />
                </div>
                <div>
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    placeholder="123"
                    value={address.number}
                    onChange={(e) =>
                      setAddress({ ...address, number: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    placeholder="Nome do bairro"
                    value={address.neighborhood}
                    onChange={(e) =>
                      setAddress({ ...address, neighborhood: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    placeholder="Sua cidade"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    placeholder="UF"
                    maxLength={2}
                    value={address.state}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        state: e.target.value.toUpperCase(),
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Coupon Section */}
          {/* <Card className="p-4 shadow-[var(--shadow-card)]">
            <div className="mb-3 flex items-center gap-2">
              <Tag className="h-5 w-5 text-secondary" />
              <h2 className="text-lg font-semibold">Cupom de Desconto</h2>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Digite seu cupom"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleApplyCoupon}
                variant="outline"
                className="shrink-0"
              >
                Aplicar
              </Button>
            </div>
          </Card> */}

          {/* Payment Method Section */}
          <Card className="p-4 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 text-lg font-semibold">Método de Pagamento</h2>

            <RadioGroup
              value={paymentMethod || ""}
              onValueChange={(value) => {
                setPaymentMethod(value as "pix" | "card");
                setShowCardForm(value === "card");
              }}
              className="space-y-3"
            >
              {/* PIX Option */}
              <Card
                className={`cursor-pointer border-2 p-4 transition-all hover:border-primary ${
                  paymentMethod === "pix"
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
                onClick={() => {
                  setPaymentMethod("pix");
                  setShowCardForm(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label
                    htmlFor="pix"
                    className="flex flex-1 cursor-pointer items-center gap-3"
                  >
                    <div className="rounded-lg bg-success/15 p-2">
                      <QrCode className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold">PIX</p>
                      <p className="text-sm text-muted-foreground">
                        Pagamento instantâneo
                      </p>
                    </div>
                  </Label>
                </div>
              </Card>

              {/* Card Option */}
              <Card
                className={`cursor-pointer border-2 transition-all hover:border-tematic ${
                  paymentMethod === "card"
                    ? "border-tematic bg-son/5"
                    : "border-border"
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label
                      htmlFor="card"
                      className="flex flex-1 cursor-pointer items-center gap-3"
                    >
                      <div className="rounded-lg bg-tematic/15 p-2">
                        <CreditCard className="h-6 w-6 text-tematic" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Cartão de Crédito</p>
                        <p className="text-sm text-muted-foreground">
                          Visa, Mastercard, Elo
                        </p>
                      </div>
                      {paymentMethod === "card" && (
                        <div className="text-primary">
                          {showCardForm ? <ChevronUp /> : <ChevronDown />}
                        </div>
                      )}
                    </Label>
                  </div>
                </div>

                {/* Expandable Card Form */}
                {paymentMethod === "card" && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      showCardForm
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-3 border-t border-border p-4 pt-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <Input
                          id="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          value={cardData.number}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\s/g, "");
                            const formatted =
                              value.match(/.{1,4}/g)?.join(" ") || value;
                            setCardData({ ...cardData, number: formatted });
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nome no Cartão</Label>
                        <Input
                          id="cardName"
                          placeholder="NOME COMPLETO"
                          value={cardData.name}
                          onChange={(e) =>
                            setCardData({
                              ...cardData,
                              name: e.target.value.toUpperCase(),
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="expiry">Validade</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/AA"
                            maxLength={5}
                            value={cardData.expiry}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, "");
                              if (value.length >= 2) {
                                value =
                                  value.slice(0, 2) + "/" + value.slice(2, 4);
                              }
                              setCardData({ ...cardData, expiry: value });
                            }}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            maxLength={4}
                            type="text"
                            value={cardData.cvv}
                            onChange={(e) =>
                              setCardData({
                                ...cardData,
                                cvv: e.target.value.replace(/\D/g, ""),
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </RadioGroup>
          </Card>

          <Card className="p-4 shadow-[var(--shadow-card)]">
            <div className="mb-3 flex items-center gap-2">
              <Tag className="h-5 w-5 text-secondary" />
              <h2 className="text-lg font-semibold">Observações do Pedido</h2>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Adicione as observações do pedido ou descrever acompanhamentos!"
                value={observabilityOrder}
                onChange={(e) => setObservabilityOrder(e.target.value)}
                className="flex-1 placeholder:text-xs"
              />
            </div>
          </Card>

          {/* Order Summary */}
          <Card className="p-4 shadow-[var(--shadow-card)]">
            <h2 className="mb-5 text-xl font-semibold text-tematic">
              Resumo do Pedido
            </h2>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxa de entrega</span>
                <span className="font-medium text-success">GRATIS</span>
              </div>
              {/* {couponCode && (
                <div className="flex justify-between text-success">
                  <span>Desconto</span>
                  <span className="font-medium">- R$ 5,09</span>
                </div>
              )} */}
              {observabilityOrder && (
                <div className="flex justify-between  text-muted-foreground">
                  <span>Observações</span>
                  <span className="font-medium"> {observabilityOrder}</span>
                </div>
              )}
              <div className="border-t border-border pt-2">
                <div className="flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-tematic">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Finish Button */}
          <Button
            onClick={handleFinishOrder}
            disabled={isSubmitLoading}
            className="w-full bg-son  py-6 text-lg font-semibold shadow-[var(--shadow-lg)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitLoading ? (
              <>
                <Icons.spinner className="mr-2 h-7 w-7 animate-spin text-white" />
                Processando Pagamento...
              </>
            ) : (
              "Finalizar Pedido"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPaymentRoute;
