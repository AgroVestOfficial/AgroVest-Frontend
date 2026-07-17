import useGetAllPurchasedProduct from "@/hooks/ReadHooks/useGetAllPurchasedProduct";
import useGetFarmProductByAddress from "@/hooks/ReadHooks/useGetFarmProductByAddress";
import { useAccount } from "wagmi";

const PortfolioAnalytics = () => {
  const { address } = useAccount();
  const { data: purchases } = useGetAllPurchasedProduct(address);
  const { data: products } = useGetFarmProductByAddress(address);

  return (
    <main className="grid w-full gap-4 bg-gray-100 md:grid-cols-3 lg:grid-cols-5">
      <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
        <h4 className="font-light text-gray-800">Total Product</h4>
        <h1 className="text-2xl font-semibold text-darkgreen">{products?.length}</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
        <h4 className="font-light text-gray-800">Total Invested</h4>
        <h1 className="text-2xl font-semibold text-darkgreen">0 ETH</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
        <h4 className="font-light text-gray-800">Product Sold</h4>
        <h1 className="text-2xl font-semibold text-darkgreen">0</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
        <h4 className="font-light text-gray-800">Product Purchased</h4>
        <h1 className="text-2xl font-semibold text-darkgreen">{purchases?.length}</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
        <h4 className="font-light text-gray-800">Funds Raised</h4>
        <h1 className="text-2xl font-semibold text-darkgreen">0</h1>
      </div>
    </main>
  );
};

export default PortfolioAnalytics;
