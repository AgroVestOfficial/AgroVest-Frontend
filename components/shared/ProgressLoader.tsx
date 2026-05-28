"use client";
import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const ProgressLoader = () => {
  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-screen w-full items-center justify-center bg-white">
      <InfinitySpin width="200" color="#02390F" />
    </div>
  );
};

export default ProgressLoader;
