import { useWriteContract } from "wagmi";
import daoAbi from "../../abis/DAO.json";
import { getAddress } from "viem";
import { useCallback } from "react";

const useVoteOnProposal = () => {
  const { writeContractAsync } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS;
  return useCallback(
    async (_proposalId: number) => {
      try {
        const result = await writeContractAsync({
          abi: daoAbi,
          address: getAddress(contractAddress ? contractAddress : ""),
          functionName: "vote_proposal",
          args: [BigInt(_proposalId)],
        });
        return result;
      } catch (err) {
        console.error("Error voting on proposal:", err);
        throw err;
      }
    },
    [writeContractAsync]
  );
};

export default useVoteOnProposal;
