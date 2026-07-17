import { useWriteContract } from "wagmi";
import daoAbi from "../../abis/DAO.json";
import { getAddress } from "viem";
import { useCallback } from "react";

const useCreateProposal = () => {
  const { writeContract } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS;
  return useCallback(
    async (_title: string, _description: string, _requiredVotes: bigint, _endsAt: bigint) => {
      try {
        const result = writeContract({
          abi: daoAbi,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "create_proposal",
          args: [_title, _description, _requiredVotes, _endsAt],
        });

        return result;
      } catch (err) {
        console.error("Error creating proposal:", err);
        throw err;
      }
    },
    [writeContract]
  );
};

export default useCreateProposal;
