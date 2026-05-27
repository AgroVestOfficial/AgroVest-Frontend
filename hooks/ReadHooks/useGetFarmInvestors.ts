import { useReadContract } from "wagmi";
import { investmentABI } from "@/abis/investment";
import { getAddress } from "viem";

const useGetFarmInvestors = (_farmId: number) => {
  const contractAddress = process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS;
  const result = useReadContract({
    abi: investmentABI,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "getAllFarmInvestors",
    args: [_farmId],
  });

  return result;
};

export default useGetFarmInvestors;
