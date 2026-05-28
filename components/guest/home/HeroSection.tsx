import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <main className="w-full bg-darkgreen">
      <div className="grid h-full w-full gap-10 px-4 pb-8 pt-32 md:h-auto md:grid-cols-2 md:px-6 md:pb-16 lg:gap-16 lg:px-14 lg:pb-16 lg:pt-28">
        {/* text */}
        <div className="order-2 flex flex-col justify-center gap-5 md:order-1 lg:gap-7">
          <h1 className="text-5xl font-medium text-white lg:text-7xl">
            Invest <span className="text-lightgreen">Smarter</span>, Grow Faster with{" "}
            <span className="text-lightgreen">AgroVest</span>.
          </h1>
          <p className="text-xl font-light text-gray-200 lg:text-2xl">
            Tokenize your business, attract investors, while showcasing your products on a thriving
            marketplace.{" "}
          </p>
          <button className="rounded-[10px] bg-lightgreen py-2.5 text-darkgreen">
            Get Started
          </button>
        </div>

        {/* Image */}
        <div className="order-1 flex h-[350px] flex-col items-center justify-center md:order-2 md:h-auto">
          <div className="relative w-full">
            <Image
              src={`https://res.cloudinary.com/dad1drjht/image/upload/v1724971626/mipvhzfujwhtoqsng93b.png`}
              className="w-full"
              alt="heroBg"
              width={2320}
              height={2320}
              quality={100}
              priority
            />

            <div className="absolute -top-6 left-1/2 h-[200px] w-[143px] -translate-x-1/2 lg:h-[300px] lg:w-[223px]">
              <Image
                src={`https://res.cloudinary.com/dad1drjht/image/upload/v1724971627/kze2sodcem4c4oy6mkte.png`}
                className="h-full w-full"
                alt="hero Image"
                width={924}
                height={1232}
                quality={100}
                priority
              />
            </div>

            <div className="absolute -bottom-6 left-1/2 h-[200px] w-[143px] -translate-x-1/2 lg:h-[300px] lg:w-[223px]">
              <Image
                src={`https://res.cloudinary.com/dad1drjht/image/upload/v1724971627/qkxyzq1jacrsmacffpyl.png`}
                className="h-full w-full"
                alt="hero Image"
                width={924}
                height={1232}
                quality={100}
                priority
              />
            </div>

            <div className="absolute -left-2 top-1/2 h-[200px] w-[143px] -translate-y-1/2 md:-left-4 lg:h-[300px] lg:w-[223px]">
              <Image
                src={`https://res.cloudinary.com/dad1drjht/image/upload/v1724971626/fy0fqauu5lxpuhncrjis.png`}
                className="h-full w-full"
                alt="hero Image"
                width={924}
                height={1232}
                quality={100}
                priority
              />
            </div>

            <div className="absolute -right-2 top-1/2 h-[200px] w-[143px] -translate-y-1/2 md:-right-4 lg:h-[300px] lg:w-[223px]">
              <Image
                src={`https://res.cloudinary.com/dad1drjht/image/upload/v1724971627/ptvmwq8olihnlwgtgbww.png`}
                className="h-full w-full"
                alt="hero Image"
                width={924}
                height={1232}
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
