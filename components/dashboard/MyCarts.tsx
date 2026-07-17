"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useAccount } from "wagmi";
import { QueryLoader, QueryError } from "@/components/shared/QueryState";
import useGetCartProducts from "@/hooks/ReadHooks/useGetCartProducts";
import { formatEther } from "viem";
import usePurchaseProduct from "@/hooks/WriteHooks/usePurchaseProduct";
import { toast } from "sonner";
import useRemoveProductFromCart from "@/hooks/WriteHooks/useRemoveProductFromCart";
import useGetAllFarms from "@/hooks/ReadHooks/useGetAllFarms";
import { FarmType, ProductType } from "@/utils/types";

const MyCarts = () => {
  // Hook calls
  const { address } = useAccount();
  const { data: initialCartItems, isLoading, isError } = useGetCartProducts(address);
  const { purchaseMultipleProducts } = usePurchaseProduct();
  const removeProduct = useRemoveProductFromCart();
  const { data: farms } = useGetAllFarms();

  const productsToPurchase = initialCartItems?.map(
    (product: { product_id: number; product_price: number }) => ({
      id: Number(product.product_id),
      price: BigInt(product.product_price),
    })
  );

  const handlePurchaseProduct = async () => {
    try {
      await purchaseMultipleProducts(productsToPurchase ?? []);
      toast.dismiss();
      toast.success("Product purchased Successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Error purchasing products");
      console.error(error);
    }
  };

  const path = usePathname();
  const [cartItems, setCartItems] = useState<ProductType[]>([]);

  const handleRemoveFromCart = async (id: number) => {
    try {
      await removeProduct(id);
      toast.dismiss();
      toast.success("Product removed from cart successfully!");
    } catch (err) {
      toast.dismiss();
      toast.error("Error removing product from cart. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (initialCartItems) {
      setCartItems(initialCartItems.map((item: ProductType) => ({ ...item, quantity: 1 })));
    }
  }, [initialCartItems]);

  // Calculate the subtotal using useMemo to memoize the calculation
  const subtotal = useMemo(() => {
    return cartItems?.reduce(
      (acc: number, item: ProductType) => acc + Number(item.product_price) * item.quantity,
      0
    );
  }, [cartItems]);

  // Fixed discount rate (2%)
  const discountRate = 0.02;

  // Calculate the discount based on the fixed rate
  const discount = useMemo(() => {
    return subtotal * discountRate;
  }, [subtotal]);

  // Calculate the total using useMemo
  const total = useMemo(() => {
    return subtotal - discount;
  }, [subtotal, discount]);

  if (isLoading) {
    return (
      <section className="flex w-full flex-col gap-6 py-4">
        <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">
          Transactions
        </h1>
        <div className="flex w-full gap-0 md:ml-3">
          <div className="bg-darkgreen px-4 py-2 text-base font-medium text-gray-200">Cart</div>
          <div className="bg-lightgreen px-4 py-2 text-base font-medium text-darkgreen">
            Purchased
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-6 md:flex-row">
          <div className="flex-1 rounded bg-gray-100 p-4">
            <QueryLoader className="h-40 w-full" />
          </div>
          <div className="flex w-full flex-col rounded bg-gray-100 md:w-[35%]">
            <QueryLoader className="h-40 w-full" />
          </div>
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
          <div className="bg-darkgreen px-4 py-2 text-base font-medium text-gray-200">Cart</div>
          <div className="bg-lightgreen px-4 py-2 text-base font-medium text-darkgreen">
            Purchased
          </div>
        </div>
        <QueryError message="Failed to load cart items. Please try again later." />
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

      <div className="flex w-full flex-col items-start gap-6 md:flex-row">
        <div className="flex-1 rounded bg-gray-100 p-4">
          <Table>
            <TableHeader>
              <TableRow className="text-gray-800">
                <TableHead className="text-start">Product</TableHead>
                <TableHead className="text-center">Total(ETH)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems?.map((item: ProductType) => (
                <TableRow key={Number(item.product_id)} className="text-gray-600">
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
                        <p className="text-xs text-gray-600">
                          {farms?.find(
                            (f: FarmType) =>
                              f.farmerAddress.toLowerCase() ===
                              String(item.product_owner).toLowerCase()
                          )?.business_name ?? "Unknown Farm"}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center font-semibold">
                    {formatEther(BigInt(Number(item.product_price)))}
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      <button
                        className="flex items-center justify-center rounded-md bg-darkgreen p-2 text-xs text-gray-200"
                        onClick={() => handleRemoveFromCart(Number(item.product_id))}
                      >
                        Remove from cart
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex w-full flex-col rounded bg-gray-100 md:w-[35%]">
          <h3 className="p-4 font-semibold text-gray-700">Order Summary</h3>
          <ul className="flex w-full list-none flex-col gap-3 border-t-[1px] border-gray-300 p-4">
            <li className="flex w-full items-center justify-between">
              <p className="font-medium text-gray-600">Subtotal</p>
              <p className="font-semibold text-gray-700">{formatEther(BigInt(subtotal))} ETH</p>
            </li>
            <li className="flex w-full items-center justify-between">
              <p className="font-medium text-gray-600">Discount (2%)</p>
              <p className="font-semibold text-gray-700">{formatEther(BigInt(discount))} ETH</p>
            </li>
            <li className="flex w-full items-center justify-between">
              <p className="font-medium text-gray-600">Total</p>
              <p className="font-semibold text-gray-700">{formatEther(BigInt(total))} ETH</p>
            </li>
            <li className="w-full">
              <Button
                type="button"
                className="mt-3 w-full rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
                onClick={() => handlePurchaseProduct()}
              >
                Make Payment
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MyCarts;
