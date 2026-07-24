import { useReadContract } from "wagmi";
import tokenAbi from "../../abis/TokenAbi.json";
import { getAddress } from "viem";

const useGetTokenBalance = () => {
  const contractAddress = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS;

  const result = useReadContract({
    abi: tokenAbi,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "getTokenBalance",
    query: { enabled: !!contractAddress },
  });

  return {
    ...result,
    data: result.data as bigint | undefined,
  };
};

export default useGetTokenBalance;
