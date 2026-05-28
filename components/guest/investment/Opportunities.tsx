import Image from "next/image";
import React from "react";

const Opportunities = () => {
  return (
    <section className="mb-20 flex w-full flex-col px-6 pt-20 md:px-28">
      <main className="flex w-full flex-col gap-6">
        <h1 className="text-3xl font-medium text-darkgreen md:text-4xl">
          Explore Investment Opportunities
        </h1>

        <div className="grid w-full gap-8 md:grid-cols-2">
          <div className="flex flex-col items-end gap-2 rounded-[10px] bg-gray-100 p-4 shadow-lg">
            <div className="h-[200px] w-full">
              <Image
                src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725027529/hv0dkqebklrenv7aeoye.png`}
                alt="farm produce"
                width={2480}
                height={1360}
                quality={100}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex w-full items-center justify-between">
              <h4 className="text-left text-base font-semibold text-gray-700">
                Ashers Fishery Farm
              </h4>
            </div>
            <p className="text-sm text-gray-500">
              A premium fishery farm offering investment opportunities in aquaculture, allowing
              investors to participate in the growing fish farming industry.
            </p>
            <button className="mt-3 rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen">
              View more
            </button>
          </div>

          <div className="flex flex-col items-end gap-2 rounded-[10px] bg-gray-100 p-4 shadow-lg">
            <div className="h-[200px] w-full">
              <Image
                src={`https://res.cloudinary.com/dad1drjht/image/upload/v1725027532/wr1rkyiv3npb2gy0wjyl.png`}
                alt="farm produce"
                width={2480}
                height={1360}
                quality={100}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex w-full items-center justify-between">
              <h4 className="text-left text-base font-semibold text-gray-700">Butch Lane</h4>
            </div>
            <p className="text-sm text-gray-500">
              A promising investment venture focused on livestock farming, providing a chance for
              investors to support and benefit from sustainable meat production.
            </p>
            <button className="mt-3 rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen">
              View more
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Opportunities;
