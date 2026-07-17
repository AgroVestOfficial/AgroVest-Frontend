"use client";
import { useReadContract } from "wagmi";
import farmAbi from "../../abis/farm.json";
import { getAddress } from "viem";
import { ProductType } from "@/utils/types";

const useGetAllFarmProducts = () => {
  const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS;
  const result = useReadContract({
    abi: farmAbi,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "getAllFarmProducts",
  });

  return {
    ...result,
    data: result.data as ProductType[] | undefined,
  };
};

export default useGetAllFarmProducts;
