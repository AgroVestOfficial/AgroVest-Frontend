import React from "react";
import type { NextPage } from "next";
import ExploreUserFarm from "@/components/dashboard/Explore";

const Explore: NextPage = () => {
  return (
    <main className="flex w-full flex-col overflow-x-hidden">
      <ExploreUserFarm />
    </main>
  );
};

export default Explore;
