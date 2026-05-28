import Image from "next/image";
import React from "react";

const Categories = () => {
  return (
    <section className="my-4 flex w-full flex-col px-2">
      <main className="flex w-full flex-col gap-6">
        <h1 className="text-2xl font-medium text-darkgreen md:text-3xl">
          Explore our product categories
        </h1>
        <div className="grid w-full md:grid-cols-2 md:gap-8">
          <div className="flex w-full items-center rounded-[10px] bg-gray-100 p-6 shadow-lg">
            <div className="flex flex-1 flex-col gap-3">
              <h4 className="text-2xl text-gray-700 md:text-3xl">Fresh Farm Produce</h4>
              <p className="text-sm text-gray-500">
                Farm-fresh fruits, vegetables, and herbs at their peak.
              </p>
            </div>
            <div className="w-[45%]">
              <Image
                src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725006978/wk70uqjvhlrtaee3r5lh.png`}
                alt="farm produce"
                width={300}
                height={217}
                quality={100}
                priority
                className="w-full"
              />
            </div>
          </div>

          <div className="flex w-full items-center gap-10 rounded-[10px] bg-gray-100 p-6 shadow-lg">
            <div className="flex flex-1 flex-col gap-3">
              <h4 className="text-2xl text-gray-700 md:text-3xl">Seeds & Plants</h4>
              <p className="text-sm text-gray-500">
                High-quality seeds and young plants ready for your garden.
              </p>
            </div>
            <div className="h-[180px] w-[30%]">
              <Image
                src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725006977/f8bfn8wcti2vactra0mo.png`}
                alt="farm produce"
                width={200}
                height={239}
                quality={100}
                priority
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Categories;
