import { useWriteContract } from "wagmi";
import daoAbi from "../../abis/DAO.json";
import { getAddress } from "viem";
import { useCallback } from "react";

const useVoteProposal = () => {
  const { writeContractAsync } = useWriteContract();

  const contractAddress = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS;

  return useCallback(
    async (_proposalId: bigint) => {
      try {
        if (!contractAddress) throw new Error("DAO contract address is missing.");
        const result = await writeContractAsync({
          abi: daoAbi,
          address: getAddress(contractAddress),
          functionName: "voteWithQuadraticPower",
          args: [_proposalId],
        });
        return result;
      } catch (err) {
        console.error("Error voting on proposal:", err);
        throw err;
      }
    },
    [writeContractAsync, contractAddress]
  );
};

export default useVoteProposal;
