import { createPixPayment } from "@/app/_components/_actions/create-payment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const requestPayment = await createPixPayment(body);
    console.log("Resposta do createPayment:", requestPayment);

    return NextResponse.json(requestPayment);
  } catch (error: any) {
    return new NextResponse(error.message ?? "error", { status: 500 });
  }
}
