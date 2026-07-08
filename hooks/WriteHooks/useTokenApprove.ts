import { useWriteContract } from "wagmi";
import tokenAbi from "@/abis/TokenAbi.json";
import { getAddress } from "viem";
import { useCallback } from "react";

const useTokenApprove = () => {
  const { writeContractAsync } = useWriteContract();

  const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS;

  return useCallback(
    async (spender: string, amount: bigint) => {
      try {
        if (!tokenAddress) throw new Error("Token contract address is missing.");
        const result = await writeContractAsync({
          abi: tokenAbi,
          address: getAddress(tokenAddress),
          functionName: "approve",
          args: [getAddress(spender), amount],
        });
        return result;
      } catch (err) {
        console.error("Error approving token:", err);
        throw err;
      }
    },
    [writeContractAsync]
  );
};

export default useTokenApprove;
