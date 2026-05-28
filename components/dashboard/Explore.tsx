"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import useGetAllAvailableInvestment from "@/hooks/ReadHooks/useGetAllAvailableInvestment";
import { InvestmentType } from "@/utils/types";

const ExploreUserFarm = () => {
  const { data: investment } = useGetAllAvailableInvestment() as unknown as {
    data: InvestmentType[];
  };

  const router = useRouter();

  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">Investments</h1>

      <div className="flex w-full items-center justify-between">
        <h3 className="font-medium text-darkgreen md:text-2xl">
          Current investment opportunities.
        </h3>
      </div>

      <div className="grid w-full gap-8 md:grid-cols-2">
        {investment?.map((res, index: number) => (
          <div
            key={index}
            className="flex flex-col items-end gap-2 rounded-[10px] bg-gray-100 p-4 shadow-lg"
          >
            <div className="h-[200px] w-full">
              <Image
                src={`https://gateway.pinata.cloud/ipfs/${res.image}`}
                alt={res.name}
                width={2480}
                height={1360}
                quality={100}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex w-full items-center justify-between">
              <h4 className="text-left text-base font-semibold text-gray-700">{res.name}</h4>
            </div>
            <p className="text-sm text-gray-500">{res.about}</p>
            <button
              className="mt-3 rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
              onClick={() => router.push(`/user/explore/${Number(res.farmId)}`)}
            >
              View more
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreUserFarm;
