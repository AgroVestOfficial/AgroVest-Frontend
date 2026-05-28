import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <main className="w-full bg-darkgreen">
      <div className="grid h-full w-full gap-10 px-4 pb-8 pt-32 md:h-auto md:grid-cols-2 md:px-6 md:pb-16 lg:gap-16 lg:px-14 lg:pb-16 lg:pt-28">
        {/* text */}
        <div className="order-2 flex flex-col justify-center gap-5 md:order-1 lg:gap-7">
          <h1 className="text-5xl font-medium text-white lg:text-7xl">
            Discover{" "}
            <span className="text-lightgreen">
              Fresh
              <br />
            </span>{" "}
            Agricultural
            <br />
            <span className="text-lightgreen">Products</span>.
          </h1>
          <p className="text-xl font-light text-gray-200 lg:text-2xl">
            Explore a diverse marketplace where farmers showcase their finest produce and businesses
            invite you to invest in the future of agriculture.{" "}
          </p>
          <button className="rounded-[10px] bg-lightgreen py-2.5 text-darkgreen">Explore</button>
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
                src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725006108/ulvab467ct9i5ssytcnk.png`}
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
                src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725006103/pepnfghwmjw0n4crdaii.png`}
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
                src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725006101/bxbmouf93mxmz3h9banz.png`}
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
                src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725006112/l4jlj0kxuvduyr5htvwf.png`}
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
