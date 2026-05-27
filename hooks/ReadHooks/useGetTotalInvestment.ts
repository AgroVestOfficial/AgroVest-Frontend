import { useReadContract } from "wagmi";
import { investmentABI } from "@/abis/investment";
import { getAddress } from "viem";

const useGetTotalInvestment = () => {
  const contractAddress = process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS;
  const result = useReadContract({
    abi: investmentABI,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "getTotalInvestment",
  });

  return result;
};

export default useGetTotalInvestment;
