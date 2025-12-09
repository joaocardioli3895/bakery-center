"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  );

  const slides = [
    {
      id: 0,
      desktop:
        "https://cdn.outback.com.br/wp-data/wp-content/uploads/2025/10/obk-Bannerdesktop_Celebracao-2-1280x714.webp",
      mobile:
        "https://cdn.outback.com.br/wp-data/wp-content/uploads/2025/09/Banner-Mobile-1.webp",
      alt: "Promoção exclusiva",
    },
    {
      id: 1,
      desktop:
        "https://cdn.outback.com.br/wp-data/wp-content/uploads/2025/09/obk-Bannerdesktop_Canecas-CTA-sem-safe-1280x714.webp",
      mobile:
        "https://cdn.outback.com.br/wp-data/wp-content/uploads/2025/09/Banner-Mobile.webp",
      alt: "Promoção exclusiva",
    },

    {
      id: 2,
      desktop:
        "https://cdn.outback.com.br/wp-data/wp-content/uploads/2025/11/Banner-Desktop.jpg",
      mobile:
        "https://cdn.outback.com.br/wp-data/wp-content/uploads/2025/11/Banner-Mobile-2.webp",
      alt: "Descontos especiais",
    },
  ];

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="w-full">
                <div className="relative h-[450px] w-full sm:h-[350px] md:h-[450px] lg:h-[550px]">
                  <picture>
                    <source media="(max-width: 768px)" srcSet={slide.mobile} />
                    <img
                      src={slide.desktop}
                      alt={slide.alt}
                      className="h-full w-full rounded-none object-cover"
                    />
                  </picture>
                  <div className="absolute inset-0" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </>
  );
}
