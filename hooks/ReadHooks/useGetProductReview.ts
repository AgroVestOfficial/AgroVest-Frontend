import { useReadContract } from "wagmi";
import farmAbi from "../../abis/farm.json";
import { getAddress } from "viem";
import { ReviewType } from "@/utils/types";

const useGetProductReview = (id: number) => {
  const contractAddress = process.env.NEXT_PUBLIC_FARM_CONTRACT_ADDRESS;

  const result = useReadContract({
    abi: farmAbi,
    address: getAddress(contractAddress ? contractAddress : ""),
    functionName: "getProductReviews",
    args: [id],
  });

  return {
    ...result,
    data: result.data as ReviewType[] | undefined,
  };
};

export default useGetProductReview;
