import { useWriteContract } from "wagmi";
import daoAbi from "../../abis/DAO.json";
import { getAddress } from "viem";
import { useCallback } from "react";

const useVoteOnProposal = () => {
  const { writeContract } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS;
  return useCallback(
    async (_proposalId: number, _vote: number) => {
      try {
        const result = writeContract({
          abi: daoAbi,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "vote_proposal",
          args: [_proposalId, _vote],
        });

        return result;
      } catch (err) {
        console.error("Error voting on proposal:", err);
        throw err;
      }
    },
    [writeContract]
  );
};

export default useVoteOnProposal;
