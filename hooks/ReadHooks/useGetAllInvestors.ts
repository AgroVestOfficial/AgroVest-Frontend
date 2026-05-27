"use client";
import { useReadContract } from "wagmi";
import { investmentABI } from "@/abis/investment";
import { getAddress } from "viem";

const useGetAllInvestors = () => {
  console.log("Hook Started ........");
  const contractAddress = process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS;
  const result = useReadContract({
    abi: investmentABI,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "getAllInvestors",
  });

  return result;
};
console.log("Hook Exported..............");
export default useGetAllInvestors;
