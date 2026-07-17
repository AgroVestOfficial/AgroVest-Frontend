import { useReadContract } from "wagmi";
import { investmentABI } from "@/abis/investment";
import { getAddress } from "viem";
import { InvestmentType } from "@/utils/types";

const useGetAllAvailableInvestment = () => {
  const contractAddress = process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS;
  const result = useReadContract({
    abi: investmentABI,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "getAllInvestableFarms",
  });

  return {
    ...result,
    data: result.data as InvestmentType[] | undefined,
  };
};

export default useGetAllAvailableInvestment;
