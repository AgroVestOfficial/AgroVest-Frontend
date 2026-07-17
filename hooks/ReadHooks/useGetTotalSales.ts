import { useReadContract } from "wagmi";
import farmAbi from "../../abis/farm.json";
import { getAddress } from "viem";

const useGetTotalSales = () => {
  const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS;

  const result = useReadContract({
    abi: farmAbi,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "getTotalSale",
  });

  return {
    ...result,
    data: result.data as bigint | undefined,
  };
};

export default useGetTotalSales;
