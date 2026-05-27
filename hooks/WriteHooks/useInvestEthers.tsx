import { useWriteContract } from "wagmi";
import { investmentABI } from "@/abis/investment";
import { getAddress, parseEther } from "viem";
import { useCallback } from "react";

const useInvestEthers = () => {
  const { writeContractAsync } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_INVESTMENT_CONTRACT_ADDRESS;
  return useCallback(
    async (_farmId: number, _amount: bigint) => {
      try {
        const result = await writeContractAsync({
          abi: investmentABI,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "investEthers",
          args: [_farmId],
          value: _amount,
        });
        return result;
      } catch (err) {
        console.error("Error investing:", err);
        throw err;
      }
    },
    [writeContractAsync]
  );
};

export default useInvestEthers;
