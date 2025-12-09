"use server";

type PaymentItem = {
  title: string;
  unitPrice: number;
  quantity: number;
  tangible: boolean;
  externalRef?: string;
};

type Customer = {
  name: string;
  email: string;
  phone: string;
  document: {
    type: "cpf" | "cnpj";
    number: string;
  };
};
type ThreeDs = {
  cavv: string;
  xid: string;
  eci: string;
  version: string;
  referenceId: string;
};

// Tipo para pagamento com Pix
type PixPaymentDto = {
  paymentMethod: "pix";
  amount: number;
  currency?: string;
  items: PaymentItem[];
  customer: Customer;
  pix?: {
    expiresInDays?: number;
  };
  metadata?: Record<string, unknown>;
};

// Tipo para pagamento com cartão
type CreditCardPaymentDto = {
  paymentMethod: "credit_card";
  amount: number;
  currency?: string;
  installments: number;
  items: PaymentItem[];
  customer: Customer;
  card: {
    hash: string;
    threeDS: ThreeDs;
  };
  metadata?: Record<string, unknown>;
};

// União dos tipos
export type CreatePaymentDto = PixPaymentDto | CreditCardPaymentDto;

// Tipo de resposta da API
export type PaymentResponse = {
  id: number;
  amount: number;
  currency: string;
  paymentMethod: "pix" | "credit_card";
  status: string;
  items: PaymentItem[];
  customer: Customer & { id: number };
  pix?: {
    qrcode: string;
    expirationDate: string;
    end2EndId: string | null;
    receiptUrl: string | null;
  };
  card?: {
    // dados do cartão quando aplicável
    [key: string]: unknown;
  };
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
};

export async function createPayment(
  dto: CreatePaymentDto,
): Promise<PaymentResponse> {
  try {
    //console.log("createPayment chamado com DTO:", JSON.stringify(dto, null, 2));
    const url = "https://api.blackcatpagamentos.com/v1/transactions";
    const publicKey = process.env.NEXT_PUBLIC_BLACKCAT_PUBLIC_KEY;
    const secretKey = process.env.BLACKCAT_SECRET_KEY;
    if (!publicKey || !secretKey) {
      throw new Error("Chaves de API não configuradas");
    }

    const auth =
      "Basic " + Buffer.from(`${publicKey}:${secretKey}`).toString("base64");
    const payload = {
      ...dto,
      currency: dto.currency || "BRL",
    };

    //console.log("Payload sendo enviado:", JSON.stringify(payload, null, 2));

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("Status da resposta:", res.status);
    console.log("Status da resposta:", res);
    console.log(
      "Headers da resposta:",
      Object.fromEntries(res.headers.entries()),
    );
    // if (!res.ok) {
    //   const errorData = await res.json();
    //   console.error("Erro da API:", errorData);
    //   throw new Error(
    //     errorData.message || `Erro na API: ${res.status} ${res.statusText}`,
    //   );
    // }

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Erro ao criar pagamento");
  }
}
