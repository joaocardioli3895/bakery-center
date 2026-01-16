import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type WebhookPayload = {
  event: string;
  data?: {
    transactionId?: string;
    orderId?: string;
    metadata?: {
      orderId?: string;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

async function handlePaid(data: WebhookPayload["data"]) {
  const orderId =
    data?.metadata?.orderId ?? data?.orderId ?? data?.transactionId;

  if (!orderId) {
    throw new Error("orderId");
  }

  await db.order.update({
    where: { id: orderId },
    data: { status: "CONFIRMED" },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as WebhookPayload;

    if (!body?.event) {
      return NextResponse.json({ error: "event" }, { status: 400 });
    }

    if (body.event === "transaction.paid") {
      await handlePaid(body.data);
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "error" },
      { status: 500 },
    );
  }
}
