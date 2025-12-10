"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white font-sans text-sm leading-relaxed text-[#8e2027]">
      {/* Top Warning Bar */}
      <div className="bg-[#8e2027] px-3 py-2 text-center text-white">
        <p className="text-xs font-bold uppercase tracking-wide">
          SE BEBER, NÃO DIRIJA.
        </p>
        <p className="mt-1 text-[10px] font-normal">
          VENDA E CONSUMO PROIBIDO PARA MENORES DE 18 ANOS
        </p>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-start justify-between gap-8 px-4 py-5 md:gap-6">
        {/* Navigation Links */}
        <nav className="flex w-full flex-col items-center justify-center md:text-center">
          <Image
            src="https://cdn.outback.com.br/wp-data/wp-content/themes/outback_2022/assets/images/outback-logo.png"
            alt="Outback Logo"
            width={120}
            height={40}
            priority
            className="md:mx-auto"
          />
          <ul className="mt-4 flex list-none flex-col items-center justify-center space-y-2.5 p-0">
            <li>
              <a
                href="https://www.outback.com.br/quemsomos"
                className="font-semibold text-[#8e2027] no-underline transition-colors duration-300 hover:text-[#bb3b3f]"
              >
                Quem Somos
              </a>
            </li>
            <li>
              <a
                href="https://faleconosco.outback.com.br/hc/pt-br"
                className="font-semibold text-[#8e2027] no-underline transition-colors duration-300 hover:text-[#bb3b3f]"
              >
                Fale Conosco
              </a>
            </li>
            <li>
              <a
                href="https://www.outback.com.br/glossario"
                className="font-semibold text-[#8e2027] no-underline transition-colors duration-300 hover:text-[#bb3b3f]"
              >
                Glossário
              </a>
            </li>
            <li>
              <a
                href="https://outback.pandape.infojobs.com.br"
                className="font-semibold text-[#8e2027] no-underline transition-colors duration-300 hover:text-[#bb3b3f]"
              >
                Trabalhe Conosco
              </a>
            </li>
            <li>
              <a
                href="https://www.outback.com.br/destaques"
                className="font-semibold text-[#8e2027] no-underline transition-colors duration-300 hover:text-[#bb3b3f]"
              >
                Destaques
              </a>
            </li>
          </ul>
        </nav>

        {/* WhatsApp Callout */}
        <div className="mt-4 flex min-w-[280px] flex-1 justify-center md:mx-auto md:my-5 md:max-w-[350px]">
          <a
            href="https://whatsapp.com/channel/0029VbAqGEw7T8bOyFQKCm2h"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chama no Whatsapp"
          ></a>
        </div>

        {/* App Section */}
        <div className="mt-4 flex flex-col  space-y-10 text-center font-bold text-[#8e2027] md:my-5 md:max-w-[350px]">
          <div className="flex h-full w-full flex-col space-y-10">
            <Image
              src="https://cdn.outback.com.br/wp-data/wp-content/themes/outback_2022/assets/images/whatsapp.png"
              alt="Outback Logo"
              width={1500}
              height={1500}
              className="md:mx-auto"
            />
            <Image
              src="https://cdn.outback.com.br/wp-data/wp-content/themes/outback_2022/assets/images/momento_outback_na_mao.png"
              alt="Outback Logo"
              width={1500}
              height={1500}
              className="md:mx-auto"
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            <a
              href="https://meuoutback.onelink.me/1BGC/Web"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="App Store"
            >
              <Image
                src="https://www.outback.com.br/wp-content/themes/outback_2022/assets/images/app_store.webp"
                alt="App Store"
                width={200}
                height={90}
                className="h-9 object-contain"
              />
            </a>
            <a
              href="https://meuoutback.onelink.me/1BGC/Web"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Play"
            >
              <Image
                src="https://www.outback.com.br/wp-content/themes/outback_2022/assets/images/google_play.webp"
                alt="Google Play"
                width={200}
                height={90}
                className="h-9 object-contain"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <ul className="mx-0 my-6 flex list-none justify-center gap-5 p-0 md:gap-4">
        <li>
          <a
            href="https://www.instagram.com/outbackbrasil/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Image
              src="https://cdn.outback.com.br/wp-data/wp-content/uploads/2022/11/ico_ig_desk.svg"
              alt="Instagram"
              width={30}
              height={30}
              className="brightness-0 brightness-[85%] contrast-[96%] hue-rotate-[345deg] invert-[29%] saturate-100 saturate-[741%] sepia-[73%] transition-all duration-300 hover:brightness-[105%] hover:contrast-[94%] hover:hue-rotate-[5deg] hover:invert-[63%] hover:saturate-[533%] hover:sepia-[97%]"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.tiktok.com/@outback_brasil"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <Image
              src="https://cdn.outback.com.br/wp-data/wp-content/uploads/2022/11/Tiktok.svg"
              alt="TikTok"
              width={30}
              height={30}
              className="brightness-0 brightness-[85%] contrast-[96%] hue-rotate-[345deg] invert-[29%] saturate-100 saturate-[741%] sepia-[73%] transition-all duration-300 hover:brightness-[105%] hover:contrast-[94%] hover:hue-rotate-[5deg] hover:invert-[63%] hover:saturate-[533%] hover:sepia-[97%]"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/outbackbrasil/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Image
              src="https://cdn.outback.com.br/wp-data/wp-content/uploads/2022/11/ico_fb_desk.svg"
              alt="Facebook"
              width={30}
              height={30}
              className="brightness-0 brightness-[85%] contrast-[96%] hue-rotate-[345deg] invert-[29%] saturate-100 saturate-[741%] sepia-[73%] transition-all duration-300 hover:brightness-[105%] hover:contrast-[94%] hover:hue-rotate-[5deg] hover:invert-[63%] hover:saturate-[533%] hover:sepia-[97%]"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/user/outbackbr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <Image
              src="https://cdn.outback.com.br/wp-data/wp-content/uploads/2022/11/Youtube-4.svg"
              alt="YouTube"
              width={30}
              height={30}
              className="brightness-0 brightness-[85%] contrast-[96%] hue-rotate-[345deg] invert-[29%] saturate-100 saturate-[741%] sepia-[73%] transition-all duration-300 hover:brightness-[105%] hover:contrast-[94%] hover:hue-rotate-[5deg] hover:invert-[63%] hover:saturate-[533%] hover:sepia-[97%]"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/company/outbackbrasil/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Image
              src="https://cdn.outback.com.br/wp-data/wp-content/uploads/2022/11/ico_lin_desk.svg"
              alt="LinkedIn"
              width={30}
              height={30}
              className="brightness-0 brightness-[85%] contrast-[96%] hue-rotate-[345deg] invert-[29%] saturate-100 saturate-[741%] sepia-[73%] transition-all duration-300 hover:brightness-[105%] hover:contrast-[94%] hover:hue-rotate-[5deg] hover:invert-[63%] hover:saturate-[533%] hover:sepia-[97%]"
            />
          </a>
        </li>
      </ul>

      {/* Footer Bottom */}
      <div className="mx-auto max-w-[1080px] border-t border-[#ddd] px-4 py-3 text-center text-[11px] font-semibold leading-relaxed text-[#555]">
        <p className="mb-2">
          Copyright © 2025 Outback Steakhouse Todos os direitos reservados.
          Todas as marcas registradas são propriedade dos seus respectivos
          donos.
        </p>
        <p className="m-0">
          <a
            href="https://www.outback.com.br/aviso-de-privacidade"
            className="mx-1.5 text-[11px] font-bold text-[#8e2027] no-underline hover:underline"
          >
            Aviso de Privacidade
          </a>{" "}
          |{" "}
          <a
            href="https://www.outback.com.br/sala-de-imprensa"
            className="mx-1.5 text-[11px] font-bold text-[#8e2027] no-underline hover:underline"
          >
            Sala de Imprensa
          </a>{" "}
          |{" "}
          <a
            href="https://www.outback.com.br/portal-de-protecao-de-dados"
            className="mx-1.5 text-[11px] font-bold text-[#8e2027] no-underline hover:underline"
          >
            Portal de proteção de dados
          </a>{" "}
          |{" "}
          <a
            href="https://www.outback.com.br/regulamentos"
            className="mx-1.5 text-[11px] font-bold text-[#8e2027] no-underline hover:underline"
          >
            Regulamentos
          </a>
        </p>
      </div>
    </footer>
  );
}
