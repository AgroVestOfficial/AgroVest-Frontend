import FarmInvestmentD from "@/components/dashboard/details/FarmInvestmentD";

import React from "react";

const PortfolioDetails = ({ params }: { params: { id: string } }) => {
  return (
    <main className="w-full flex flex-col overflow-x-hidden">
      {/* <ExploreD id={params.id} /> */}

      <FarmInvestmentD id={params.id} />

      {/* <FarmPortfolioD id={params.id} /> */}

      {/* <ProductD id={params.id} /> */}
    </main>
  );
};

export default PortfolioDetails;
