import React from "react";
import type { NextPage } from "next";
import DAO from "@/components/dashboard/DAO";

const Governance: NextPage = () => {
  return (
    <main className="flex w-full flex-col overflow-x-hidden">
      <DAO />
    </main>
  );
};
export default Governance;
