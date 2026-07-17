import { useReadContract } from "wagmi";
import { investmentABI } from "@/abis/investment";
import { getAddress } from "viem";
import { InvestorsType } from "@/utils/types";

const useGetFarmInvestors = (_farmId: number) => {
  const contractAddress = process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS;
  const result = useReadContract({
    abi: investmentABI,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "getAllFarmInvestors",
    args: [BigInt(_farmId)],
  });

  return {
    ...result,
    data: result.data as InvestorsType[] | undefined,
  };
};

export default useGetFarmInvestors;
