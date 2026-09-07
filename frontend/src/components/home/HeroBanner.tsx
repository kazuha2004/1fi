import Image from "next/image";

export function HeroBanner() {
  return (
    <section className="relative -mx-4 -mt-5 w-[calc(100%+2rem)] overflow-hidden shadow-none">
      <Image
        src="https://cdn.1fi.in/banners/shop-page%201536x1024.webp"
        alt="Shop today, Pay later using Mutual funds"
        width={800}
        height={400}
        priority
        className="h-auto w-full object-cover"
        sizes="(max-width: 500px) 100vw, 500px"
      />
    </section>
  );
}
