"use client";
import { ProductType } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { formatEther } from "viem";
import { QueryLoader } from "@/components/shared/QueryState";

const Products = ({
  title,
  data,
  isLoading,
}: {
  title: string;
  data: ProductType[];
  isLoading?: boolean;
}) => {
  const router = useRouter();
  return (
    <section className="mb-20 flex w-full flex-col px-2">
      <main className="flex w-full flex-col gap-6">
        <h1 className="text-xl font-medium text-darkgreen md:text-2xl">{title}</h1>
        {isLoading ? (
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
        ) : data?.length === 0 ? (
          <h1 className="mt-8 flex h-full w-full items-center justify-center text-xl font-medium text-darkgreen md:text-2xl">
            You don&apos;t have a product yet
          </h1>
        ) : (
          <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.map(
              (product: ProductType): JSX.Element => (
                <div
                  key={Number(product.product_id)}
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
                    <h4 className="text-base font-semibold text-gray-700">
                      {product.product_name}
                    </h4>
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
                    View Product Details
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </main>
    </section>
  );
};

export default Products;
