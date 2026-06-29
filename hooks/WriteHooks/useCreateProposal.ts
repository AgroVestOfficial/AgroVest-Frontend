import { useWriteContract } from "wagmi";
import daoAbi from "../../abis/DAO.json";
import { getAddress } from "viem";
import { useCallback } from "react";

const useCreateProposal = () => {
  const { writeContractAsync } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS;
  return useCallback(
    async (_title: string, _description: string, _executionTime: number) => {
      try {
        const result = await writeContractAsync({
          abi: daoAbi,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "create_proposal",
          args: [_title, _description, BigInt(_executionTime)],
        });
        return result;
      } catch (err) {
        console.error("Error creating proposal:", err);
        throw err;
      }
    },
    [writeContractAsync]
  );
};

export default useCreateProposal;
