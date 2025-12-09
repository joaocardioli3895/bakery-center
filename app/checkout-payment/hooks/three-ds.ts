export function useThreeDS() {
  async function load() {
    if ((window as any).ShieldHelper) return;
    await new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = "https://api.blackcatpagamentos.com/v1/js";
      s.onload = res;
      s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  async function setKey(pk: string) {
    const m = (window as any).ShieldHelper.getModuleName();
    await (window as any)[m].setPublicKey(pk);
  }

  async function getSettings(pk: string) {
    const r = await fetch(
      `https://api.blackcatpagamentos.com/api/v1/js/get3dsSettings?publicKey=${pk}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );
    return r.json();
  }

  function injectIframe(url: string) {
    const id = (window as any).ShieldHelper.getIframeId();
    const iframe = document.createElement("iframe");
    iframe.id = id;
    iframe.src = url;
    iframe.width = "100%";
    iframe.height = "400px";
    iframe.style.border = "none";
    const el = document.getElementById("payment-form");
    if (el) el.appendChild(iframe);
  }

  async function prepare({ amount, currency, installments }: any) {
    //VERIFICAR O PROBLEMA AQUI NESTA FUNÇÃO.
    console.log("prepareThreeDS chamado com:", {
      amount,
      currency,
      installments,
    });
    const teste = await (window as any).ShieldHelper.prepareThreeDS({
      amount,
      currency,
      installments,
    });
    console.log("prepareThreeDS resultado:", teste);
  }

  async function encrypt(card: any) {
    const m = (window as any).ShieldHelper.getModuleName();
    const mod = (window as any)[m];
    console.log(Object.keys(window[m]));
    return mod.encrypt(card);
  }

  return {
    load,
    setKey,
    getSettings,
    injectIframe,
    prepare,
    encrypt,
  };
}

// 100/100 = 1  | 50/100 = 0.50 | 5 | 100 = 0.05
