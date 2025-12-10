// Importando Suspense do React
import { Suspense } from "react";
import PaymentPixRoute from "./payment-pix-route";

const PaymentPixFallback = () => <div> </div>;

export default function Page() {
  return (
    <Suspense fallback={<PaymentPixFallback />}>
      <PaymentPixRoute />
    </Suspense>
  );
}
