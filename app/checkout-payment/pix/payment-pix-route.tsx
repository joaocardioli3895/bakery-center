'use client' // Marca este componente como um Client Component

import { useContext, useEffect, useState } from "react";
import { QrCode, Copy, CheckCircle2, Clock, BadgeCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Card } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { formatCurrency } from "@/app/_helpers/price";
import { CartContext } from "@/app/_context/cart";
import { QRCodeSVG } from "qrcode.react";

const PaymentPixRoute = () => {
  const search = useSearchParams();
  const qrcode = search.get("qrcode") || "";
  console.log("QRCODE DA URL:", qrcode);

  const navigate = useRouter();
  const [timeLeft, setTimeLeft] = useState(3600);
  const [copied, setCopied] = useState(false);
  const { totalPrice } = useContext(CartContext);

  // Simulated PIX code
  const pixCode = qrcode;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast("Tempo expirado", {
            description: "O código PIX expirou. Por favor, gere um novo.",
            duration: 5000,
          });
          //navigate.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    toast("Código copiado!", {
      description: "Cole no app do seu banco para pagar",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
   <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex justify-center ">
        <div className="sticky z-30 -mt-2 flex h-30 w-11/12   justify-center rounded-3xl bg-son px-4  py-4 shadow-lg">
          <h1 className="flex flex-col justify-start items-center text-center    text-xl font-bold  text-primary-foreground">
            Pedido Realizado com Sucesso!
            <BadgeCheck className="ml-2 h-7 w-7 text-white" />
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-lg space-y-6 p-4">
        {/* Timer */}
        <Card className="border border-son/50 bg-son/5 p-4 shadow-none">
          <div className="text-dark flex items-center justify-center  gap-2">
            <Clock className="h-5 w-5 " />
            <span className="text-lg  font-semibold ">
              Expira em {formatTime(timeLeft)}
            </span>
          </div>
        </Card>

        {/* Instructions */}
        <Card className="p-6 shadow-[var(--shadow-card)]">
          <div className="mb-4 text-center">
            <div className="mx-auto mb-3 inline-flex rounded-full bg-success/20 p-3">
              <QrCode className="h-8 w-8 text-success" />
            </div>
            <h2 className="mb-2 text-xl font-bold">Escaneie o QR Code</h2>
            <p className="text-sm text-muted-foreground">
             Seu pedido já está quase chegando! Escaneie o QR Code ou copie o código PIX abaixo para concluir o pagamento.
            </p>
          </div>

          {/* QR Code Placeholder */}
          <div className="my-6 flex justify-center">
            <div className="rounded-xl border-4 border-border bg-white p-2">
              <QRCodeSVG value={qrcode} size={220} />
            </div>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">ou</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* PIX Code */}
          <div className="space-y-3">
            <p className="text-center text-sm font-medium">
              Copie o código PIX
            </p>
            <div className="relative">
              <div className="break-all rounded-lg border-2 border-dashed border-border bg-muted/50 p-4 pr-12 font-mono text-xs">
                {pixCode}
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleCopyCode}
                className="absolute right-2 top-2 hover:bg-primary/10"
              >
                {copied ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Payment Steps */}
        <Card className="p-6 shadow-[var(--shadow-card)]">
          <h3 className="mb-4 font-semibold">Como pagar:</h3>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                1
              </span>
              <span>Abra o aplicativo do seu banco</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                2
              </span>
              <span>Escolha pagar via PIX QR Code ou Pix Copia e Cola</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                3
              </span>
              <span>Escaneie o código ou cole o código copiado</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                4
              </span>
              <span>Confirme o pagamento</span>
            </li>
          </ol>
        </Card>

        {/* Total */}
        <Card className="bg-gradient-to-r from-tematic to-son p-6 shadow-[var(--shadow-lg)]">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-primary-foreground">
              Total a Pagar
            </span>
            <span className="text-2xl font-bold text-primary-foreground">
            {formatCurrency(totalPrice)}
            </span>
          </div>
        </Card>

        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate.push("/")}
          className="w-full border-2"
        >
          Voltar ao Cardápio
        </Button>
      </div>
    </div>
  );
};

export default PaymentPixRoute;
