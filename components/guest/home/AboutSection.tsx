import Image from "next/image";
import React from "react";

const AboutSection = () => {
  return (
    <section className="my-12 flex w-full flex-col items-center px-4 md:my-20 md:px-6 lg:px-20">
      <main className="grid w-full bg-lightgreen/[40%] lg:h-[600px] lg:grid-cols-2 lg:rounded-e-2xl">
        <div className="grid h-full w-full grid-rows-2">
          <div className="h-full w-full">
            <Image
              src={`https://res.cloudinary.com/dad1drjht/image/upload/v1724974943/goejgvi3hst0zlxn139l.png`}
              className="h-full w-full"
              alt="heroBg"
              width={761}
              height={336}
              quality={100}
              priority
            />
          </div>
          <div className="h-full w-full">
            <Image
              src={`https://res.cloudinary.com/dad1drjht/image/upload/v1724974937/kaaz3t9bxzuzincfshq2.png`}
              className="h-full w-full"
              alt="heroBg"
              width={761}
              height={336}
              quality={100}
              priority
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 px-6 py-8 md:py-12">
          <h1 className="text-3xl font-medium text-darkgreen md:text-4xl lg:text-5xl">
            About AgroVest
          </h1>
          <p className="text-lg text-gray-900">
            Welcome to AgroVest, where innovation meets agriculture. We’re redefining how farmers
            connect with investors and customers through our cutting-edge platform. AgroVest
            empowers farmers to tokenize their businesses, opening up new avenues for investment and
            growth.
          </p>
          <p className="text-lg text-gray-900">
            Our platform provides a secure, decentralized environment for farmers to showcase their
            products and attract investment from a global network of investors. By digitizing
            agricultural assets and offering them on a dynamic marketplace, we bridge the gap
            between farm operations and capital, fostering sustainable growth and increased
            profitability.
          </p>
          <p className="text-lg text-gray-900">
            Join us in shaping the future of farming with transparency, efficiency, and innovation.
          </p>
        </div>
      </main>
    </section>
  );
};

export default AboutSection;
