/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { QueryLoader, QueryError } from "@/components/shared/QueryState";
import useGetAllPurchasedProduct from "@/hooks/ReadHooks/useGetAllPurchasedProduct";
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { ProductType } from "@/utils/types";

const PurchasedItems = () => {
  const { address } = useAccount();
  const path = usePathname();
  const { data: purchasedItem, isLoading, isError } = useGetAllPurchasedProduct(address);

  if (isLoading) {
    return (
      <section className="flex w-full flex-col gap-6 py-4">
        <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">
          Transactions
        </h1>
        <div className="flex w-full gap-0 md:ml-3">
          <div className="bg-lightgreen px-4 py-2 text-base font-medium text-darkgreen">Cart</div>
          <div className="bg-darkgreen px-4 py-2 text-base font-medium text-gray-200">
            Purchased
          </div>
        </div>
        <div className="w-full flex-1 rounded bg-gray-100 p-4">
          <QueryLoader className="h-40 w-full" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex w-full flex-col gap-6 py-4">
        <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">
          Transactions
        </h1>
        <div className="flex w-full gap-0 md:ml-3">
          <div className="bg-lightgreen px-4 py-2 text-base font-medium text-darkgreen">Cart</div>
          <div className="bg-darkgreen px-4 py-2 text-base font-medium text-gray-200">
            Purchased
          </div>
        </div>
        <QueryError message="Failed to load purchased items. Please try again later." />
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">Transactions</h1>

      <div className="flex w-full gap-0 md:ml-3">
        <Link
          href="/user/transactions"
          className={`px-4 py-2 text-base font-medium ${
            path === "/user/transactions"
              ? "bg-darkgreen text-gray-200"
              : "bg-lightgreen text-darkgreen"
          }`}
        >
          Cart
        </Link>
        <Link
          href="/user/transactions/purchased"
          className={`px-4 py-2 text-base font-medium ${
            path === "/user/transactions/purchased"
              ? "bg-darkgreen text-gray-200"
              : "bg-lightgreen text-darkgreen"
          }`}
        >
          Purchased
        </Link>
      </div>

      <div className="w-full flex-1 rounded bg-gray-100 p-4">
        <Table>
          <TableHeader>
            <TableRow className="text-gray-800">
              <TableHead className="text-start">Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-center">Total(ETH)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchasedItem?.map((item: ProductType, index: number) => (
              <TableRow key={index} className="text-gray-600">
                <TableCell className="text-start font-medium">
                  <div className="flex items-center gap-2">
                    <div className="h-[50px] w-[50px]">
                      <Image
                        src={`https://gateway.pinata.cloud/ipfs/${item.product_image}`}
                        alt={item.product_name}
                        width={640}
                        height={427}
                        quality={100}
                        priority
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold text-gray-700">{item.product_name}</h3>
                    </div>
                  </div>
                </TableCell>
                <TableCell>1</TableCell>
                <TableCell className="text-center font-semibold">
                  {formatEther(BigInt(Number(item.product_price)))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default PurchasedItems;
