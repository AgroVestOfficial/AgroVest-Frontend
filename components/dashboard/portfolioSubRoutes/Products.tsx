/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { formatEther } from "viem";
import PortfolioAnalytics from "./PortfolioAnalytics";
import { ProductType } from "@/utils/types";
import MyMarket from "../MyMarketForPortfolio";

const Products = ({ data }: { data: ProductType[] }) => {
  const path = usePathname();
  const router = useRouter();

  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">Farmer</h1>

      <PortfolioAnalytics />

      <div className="flex w-full gap-0 md:ml-3">
        <Link
          href="/user/portfolio"
          className={`px-4 py-2 text-base font-medium ${
            path === "/user/portfolio"
              ? "bg-darkgreen text-gray-200"
              : "bg-lightgreen text-darkgreen"
          }`}
        >
          Farm
        </Link>
        <Link
          href="/user/portfolio/investments"
          className={`px-4 py-2 text-base font-medium ${
            path === "/user/portfolio/investments"
              ? "bg-darkgreen text-gray-200"
              : "bg-lightgreen text-darkgreen"
          }`}
        >
          Investments
        </Link>
        <Link
          href="/user/portfolio/products"
          className={`px-4 py-2 text-base font-medium ${
            path === "/user/portfolio/products"
              ? "bg-darkgreen text-gray-200"
              : "bg-lightgreen text-darkgreen"
          }`}
        >
          Products
        </Link>
      </div>

      <MyMarket />

      {data?.length === 0 ? (
        <h1 className="mt-8 flex h-full w-full items-center justify-center text-xl font-medium text-darkgreen md:text-2xl">
          You don&apos;t have a product yet
        </h1>
      ) : (
        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.map(
            (product: ProductType, index: number): JSX.Element => (
              <div
                key={index}
                className="flex flex-col gap-2 rounded-[10px] bg-gray-100 p-4 shadow-lg"
              >
                <div className="h-[150px] w-full">
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${product.product_image}`}
                    alt="farm produce"
                    width={300}
                    height={217}
                    quality={100}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex w-full items-center justify-between">
                  <h4 className="text-base font-semibold text-gray-700">{product.product_name}</h4>
                  <p className="text-gray-700">
                    {`${formatEther(BigInt(product.product_price))}`}{" "}
                    <span className="font-semibold">ETH</span>
                  </p>
                </div>
                <p className="text-sm text-gray-500">{product.product_description}</p>
                <button
                  className="rounded-[10px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
                  onClick={() => router.push(`/user/marketplace/${product.product_id}`)}
                >
                  Add to cart
                </button>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default Products;
