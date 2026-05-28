import ExploreD from "@/components/dashboard/details/ExploreD";
import React from "react";

const ExploreDetails = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex w-full flex-col overflow-x-hidden">
      <ExploreD id={params.id} />
    </main>
  );
};

export default ExploreDetails;
