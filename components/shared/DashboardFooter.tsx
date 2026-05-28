"use client";
import React, { useEffect, useState } from "react";

const DashboardFooter = () => {
  const [year, setYear] = useState("");

  useEffect(() => {
    const year = new Date().getFullYear();
    setYear(year.toString());
  }, []);

  return (
    <footer className="flex w-full items-center justify-center bg-lightgreen/[40%] py-6">
      <p className="text-sm text-darkgreen">© {year} AgroVest. All rights reserved.</p>
    </footer>
  );
};

export default DashboardFooter;
