import { useReadContract } from "wagmi";
import farmAbi from "../../abis/farm.json";
import { getAddress } from "viem";
import { ProductType } from "@/utils/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useGetFarmProductByAddress = (address: any) => {
  const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS;

  const result = useReadContract({
    abi: farmAbi,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "getFarmProducts",
    account: address,
  });

  return {
    ...result,
    data: result.data as ProductType[] | undefined,
  };
};

export default useGetFarmProductByAddress;
