import Image from "next/image";
import React from "react";

const OurProcess = () => {
  return (
    <main className="relative mt-12 flex w-full flex-col justify-between gap-6 bg-darkgreen px-4 py-12 md:mt-28 md:flex-row md:px-6 lg:mb-20 lg:px-12">
      <div className="flex flex-col gap-10 lg:w-[30%]">
        <h1 className="text-3xl font-semibold text-lightgreen md:text-4xl">Our Process</h1>
        <ul className="flex list-none flex-col gap-7">
          <li className="flex items-start gap-4">
            <h5 className="mt-1 flex items-center justify-center bg-lightgreen px-4 py-3 font-bold text-darkgreen">
              1
            </h5>
            <p className="text-base text-gray-200">
              Connect wallet: Start by connecting your digital wallet to AgroVest. This step ensures
              secure transactions and seamless interaction with the platform, allowing you to manage
              investments and access features easily.
            </p>
          </li>
          <li className="flex items-start gap-4">
            <h5 className="mt-1 flex items-center justify-center bg-lightgreen px-4 py-3 font-bold text-darkgreen">
              2
            </h5>
            <p className="text-base text-gray-200">
              Explore Products: Start by browsing our marketplace, where you’ll find a wide variety
              of farm-fresh produce, seeds, plants, and more. Each product is listed with detailed
              information to help you make informed choices.{" "}
            </p>
          </li>
        </ul>
      </div>

      <div className="flex flex-col justify-center gap-10 lg:w-[30%]">
        <ul className="flex list-none flex-col gap-7">
          <li className="flex items-start gap-4">
            <h5 className="mt-1 flex items-center justify-center bg-lightgreen px-4 py-3 font-bold text-darkgreen">
              3
            </h5>
            <p className="text-base text-gray-200">
              Customize & Checkout: Select the products you want, customize your order, and easily
              add them to your cart. Review your order and complete the purchase using our secure
              checkout process.
            </p>
          </li>
          <li className="flex items-start gap-4">
            <h5 className="mt-1 flex items-center justify-center bg-lightgreen px-4 py-3 font-bold text-darkgreen">
              4
            </h5>
            <p className="text-base text-gray-200">
              Get your delivery: your products will be prepared and delivered directly to you. Enjoy
              the freshness and quality of your AgroVest marketplace selections, knowing you’ve
              supported sustainable farming practices.{" "}
            </p>
          </li>
        </ul>
      </div>

      {/* mockup */}
      <div className="absolute -top-16 left-1/2 hidden w-[143px] -translate-x-1/2 lg:block lg:w-[313px]">
        <Image
          src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725004222/elliizudku0gxtdcbtrz.png`}
          className="w-full"
          alt="heroBg"
          width={413}
          height={818}
          quality={100}
          priority
        />
      </div>
    </main>
  );
};

export default OurProcess;
