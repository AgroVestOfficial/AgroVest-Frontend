import { useReadContract } from "wagmi";
import farmAbi from "../../abis/farm.json";
import { getAddress } from "viem";
import { FarmType } from "@/utils/types";

const useGetAllFarms = () => {
  const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS;
  const result = useReadContract({
    abi: farmAbi,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "get_all_farms",
  });

  return {
    ...result,
    data: result.data as FarmType[] | undefined,
  };
};

export default useGetAllFarms;
