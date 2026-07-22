import { useReadContract } from "wagmi";
import daoAbi from "../../abis/DAO.json";
import { getAddress } from "viem";
import { ProposalType } from "@/utils/types";

const useGetAllProposals = () => {
  const contractAddress = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS;
  if (!contractAddress) throw new Error("DAO contract address is missing.");

  const result = useReadContract({
    abi: daoAbi,
    address: getAddress(contractAddress),
    functionName: "getAllProposals",
  });

  return {
    ...result,
    data: result.data as ProposalType[] | undefined,
  };
};

export default useGetAllProposals;
