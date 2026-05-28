"use client";

import Link from "next/link";
import Logo from "./Logo";
import MaxWrapper from "./MaxWrapper";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/utils/navLinks";
import logo from "@/public/logo-white.png";
import { WalletComponents } from "./WalletComponent";

const GuestHeader = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (showMobileNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  });

  return (
    <header className="w-full overflow-hidden">
      <div
        className={`fixed inset-x-0 top-0 z-50 h-20 w-full bg-darkgreen py-3 transition-all duration-150 md:px-4 lg:px-8`}
      >
        <MaxWrapper className="flex h-full w-full items-center justify-between">
          <Logo href="/" classname="md:w-[150px] w-[110px]" image={logo} />

          <div className="hidden h-full items-center justify-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`before:duration-[0.3s] before:ease-[ease-out] before:delay-[0s] relative z-[1] text-base text-gray-100 before:absolute before:-left-2.5 before:top-2 before:h-[7px] before:w-[7px] before:rounded-full before:bg-lightgreen before:opacity-0 before:transition-all before:content-[''] hover:text-lightgreen hover:before:opacity-100 ${
                  pathname === link.href && "text-lightgreen before:opacity-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3">
            {/* <button
                            type="button"
                            onClick={walletConnect}
                            className={`md:px-8 px-6 py-2.5 font-medium text-sm rounded-[10px] bg-lightgreen text-darkgreen`}
                        >
                            {
                                isConnected ? <WalletConnected address={address} icon={walletInfo?.icon} />
                                    : <span>Connect Wallet</span>
                            }
                        </button> */}

            {/* <appkit-button /> */}
            <WalletComponents />

            <div className="md:hidden">
              <button
                onClick={() => setShowMobileNav(!showMobileNav)}
                className="rounded-[10px] bg-white p-1.5 text-darkgreen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile */}
            <div
              className={`duration-[500ms] ease-[cubic-bezier(0.86,0,0.07,1)] fixed top-0 z-[99] flex h-[100dvh] w-full justify-end bg-lightgreen transition-all lg:hidden ${
                showMobileNav ? "left-0" : "left-[100%]"
              }`}
            >
              <div
                className={`duration-[500ms] ease-[cubic-bezier(0.86,0,0.07,1)] flex h-full w-[80%] flex-col gap-10 bg-darkgreen px-8 py-8 transition-all delay-300 ${
                  showMobileNav ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <header className="flex w-full items-center justify-between">
                  <Logo href="/" classname="w-[120px]" image={logo} />
                  <button
                    type="button"
                    className="text-2xl text-white"
                    onClick={() => setShowMobileNav(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </header>

                <ul className="mt-10 flex flex-col items-start gap-6 lg:hidden">
                  {navLinks.map((link, index) => (
                    <li className="group relative block list-none" key={index}>
                      <Link
                        className={`font-barlow before:duration-[0.3s] before:ease-[ease-out] before:delay-[0s] relative z-[1] block text-sm font-bold uppercase leading-none tracking-[0.8px] text-gray-100 before:absolute before:-left-3 before:top-1 before:h-[7px] before:w-[7px] before:rounded-full before:bg-lightgreen before:opacity-0 before:transition-all before:content-[''] group-hover:text-lightgreen group-hover:before:opacity-100 ${
                          pathname === link.href && "text-lightgreen before:opacity-100"
                        }`}
                        href={link.href}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </MaxWrapper>
      </div>
    </header>
  );
};

export default GuestHeader;
