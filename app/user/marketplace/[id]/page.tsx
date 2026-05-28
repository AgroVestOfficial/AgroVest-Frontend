import ProductD from "@/components/dashboard/details/ProductD";
import React from "react";

const ProductDetails = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex w-full flex-col overflow-x-hidden">
      <ProductD id={params.id} />
    </main>
  );
};

export default ProductDetails;
