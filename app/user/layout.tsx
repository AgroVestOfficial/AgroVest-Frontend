"use client";

import DashboardFooter from "@/components/shared/DashboardFooter";
import DashboardHeader from "@/components/shared/DashboardHeader";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import React, { useState } from "react";
import { Grid } from "react-loader-spinner";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isConnected, isReconnecting } = useAccount();
  const { open } = useAppKit();

  if (isReconnecting) {
    return (
      <div className="flex h-screen items-center justify-center bg-lightgreen/[20%]">
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#1a3a2a"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-6 bg-lightgreen/[20%]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-darkgreen">Connect Your Wallet</h1>
          <p className="mt-2 text-gray-600">Please connect your wallet to access the dashboard.</p>
        </div>
        <button
          onClick={() => open()}
          className="rounded-lg bg-darkgreen px-6 py-3 text-white transition-colors hover:bg-darkgreen/90"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="bg-lightgreen/[20%]">
      {/* Page Wrapper Start  */}
      <div className="flex h-screen gap-1.5 overflow-hidden">
        {/* Sidebar Start */}
        <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Sidebar End  */}

        {/* Content Area Start  */}
        <div className="no-scrollbar relative flex min-h-screen flex-1 flex-col justify-between overflow-y-auto overflow-x-hidden">
          <section>
            {/*  Header Start */}
            <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/*  Header End */}

            {/*  Main Content Start */}
            <main>
              <div className="mx-auto max-w-screen-2xl pb-6 pt-4 md:pb-10 md:pt-4 2xl:p-10">
                <section className="w-full px-4 md:px-3">{children}</section>
              </div>
            </main>
          </section>
          {/*  Main Content End  */}
          <DashboardFooter />
        </div>
        {/*  Content Area End  */}
      </div>
      {/*  Page Wrapper End  */}
    </div>
  );
}
