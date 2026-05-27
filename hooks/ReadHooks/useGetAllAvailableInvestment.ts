import { useReadContract } from "wagmi";
import { investmentABI } from "@/abis/investment";
import { getAddress } from "viem";

const useGetAllAvailableInvestment = () => {
  const contractAddress = process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS;
  const result = useReadContract({
    abi: investmentABI,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "getAllInvestableFarms",
  });

  return result;
};

export default useGetAllAvailableInvestment;
