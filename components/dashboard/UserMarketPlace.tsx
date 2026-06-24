"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Categories from "./Categories";
import Products from "./Products";
import { QueryLoader, QueryError } from "@/components/shared/QueryState";
import { ProductType } from "@/utils/types";
import { useAccount } from "wagmi";
import useGetFarmProductByAddress from "@/hooks/ReadHooks/useGetFarmProductByAddress";

const MarketPlace = () => {
  const { address } = useAccount();
  const {
    data: products,
    isLoading,
    isError,
  } = useGetFarmProductByAddress(address) as unknown as {
    data: ProductType[];
    isLoading: boolean;
    isError: boolean;
  };
  const path = usePathname();

  if (isLoading) {
    return (
      <section className="flex w-full flex-col gap-6 py-4">
        <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">
          Market Place
        </h1>
        <div className="flex w-full gap-4">
          <div className="rounded bg-darkgreen px-4 py-2 text-base font-medium text-lightgreen">
            All Products
          </div>
          <div className="rounded px-4 py-2 text-base font-medium text-darkgreen">My Products</div>
        </div>
        <Categories />
        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-[10px] bg-gray-100 p-4 shadow-lg">
              <QueryLoader className="h-[150px] w-full" />
              <QueryLoader className="h-4 w-3/4" />
              <QueryLoader className="h-3 w-full" />
              <QueryLoader className="h-10 w-40" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex w-full flex-col gap-6 py-4">
        <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">
          Market Place
        </h1>
        <div className="flex w-full gap-4">
          <div className="rounded bg-darkgreen px-4 py-2 text-base font-medium text-lightgreen">
            All Products
          </div>
          <div className="rounded px-4 py-2 text-base font-medium text-darkgreen">My Products</div>
        </div>
        <Categories />
        <QueryError message="Failed to load products. Please try again later." />
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">Market Place</h1>

      <div className="flex w-full gap-4">
        <Link
          href="/user/marketplace"
          className={`rounded px-4 py-2 text-base font-medium ${
            path === "/user/marketplace" ? "bg-darkgreen text-lightgreen" : "text-darkgreen"
          }`}
        >
          All Products
        </Link>
        <Link
          href="/user/marketplace/mine"
          className={`rounded px-4 py-2 text-base font-medium ${
            path === "/user/marketplace/mine" ? "bg-darkgreen text-lightgreen" : "text-darkgreen"
          }`}
        >
          My Products
        </Link>
      </div>

      <Categories />

      <Products title="All Products" data={products} />
    </section>
  );
};

export default MarketPlace;
