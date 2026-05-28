"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Categories from "./Categories";
import Products from "./Products";
// import useGetAllFarmProducts from "@/hooks/ReadHooks/useGetAllFarmProducts";
import { ProductType } from "@/utils/types";
import { useAccount } from "wagmi";
import useGetFarmProductByAddress from "@/hooks/ReadHooks/useGetFarmProductByAddress";

const MarketPlace = () => {
  const { address } = useAccount();
  const { data: products } = useGetFarmProductByAddress(address) as unknown as {
    data: ProductType[];
  };
  console.log("All Marketplace Products", products);
  const path = usePathname();
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
