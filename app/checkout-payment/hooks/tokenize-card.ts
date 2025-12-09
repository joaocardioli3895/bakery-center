export type Card = {
  number: string;
  holderName: string;
  expMonth: number;
  expYear: number;
  cvv: string;
};

async function loadScript(src: string) {
  if ((globalThis as any).BlackCatPay) return (globalThis as any).BlackCatPay;

  return new Promise<void>((res, rej) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => res((globalThis as any).BlackCatPay);
    s.onerror = rej;
    document.head.appendChild(s);
  });
}

export async function tokenizeCard(card: Card) {
  await loadScript("https://api.blackcatpagamentos.com/v1/js");

  const m = (window as any).ShieldHelper.getModuleName();
  const mod = (window as any)[m];

  await mod.setPublicKey(process.env.NEXT_PUBLIC_BLACKCAT_PUBLIC_KEY);
  const token = await mod.encrypt(card);

  return token as string;
}
