"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import logo from "@/public/logo-green.png";
import Link from "next/link";
import { navLinks } from "@/utils/navLinks";
import { IoLogoInstagram, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io";
import { FaSquareFacebook } from "react-icons/fa6";

const GuestFooter = () => {
  const [year, setYear] = useState("");

  useEffect(() => {
    const year = new Date().getFullYear();
    setYear(year.toString());
  }, []);

  return (
    <section className="flex w-full flex-col gap-10 bg-lightgreen/[40%] px-4 pt-28 md:px-8 lg:px-20">
      <footer className="grid w-full gap-8 md:grid-cols-2 md:gap-0">
        <div className="flex w-full flex-col items-start gap-6">
          <Logo href="/" classname="md:w-[170px] w-[120px]" image={logo} />
          <div className="flex flex-col gap-4">
            <p className="text-lg text-gray-600">
              Subscribe to our newsletter for exclusive updates.
            </p>
            <div className="flex">
              <input
                type="email"
                className="w-full rounded-s-[10px] border border-gray-600 bg-transparent px-3.5 py-3 text-base text-gray-600"
                placeholder="Enter your email"
              />
              <button className="rounded-e-[10px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen shadow shadow-gray-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* quick links */}
        <ul className="flex flex-col gap-6 md:items-end md:justify-end">
          {navLinks.map(
            (link, index): JSX.Element => (
              <li className="group relative block list-none" key={index}>
                <Link
                  className={`block text-sm font-medium leading-none text-gray-600`}
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            )
          )}
          <li className="group relative block list-none">
            <Link className={`block text-sm font-medium leading-none text-gray-600`} href={"/"}>
              Get Started
            </Link>
          </li>
        </ul>
      </footer>
      <div className="flex w-full flex-col justify-center gap-4 border-t border-gray-500 py-6 md:flex-row md:justify-between">
        <p className="text-center text-sm text-gray-600">© {year} AgroVest. All rights reserved.</p>
        {/* links */}
        <div className="flex justify-center gap-4">
          <Link href="/" className="text-sm text-gray-600">
            Terms & Conditions
          </Link>
          <Link href="/" className="text-sm text-gray-600">
            Privacy Policy
          </Link>
        </div>
        {/* socials */}
        <div className="flex justify-center gap-4">
          <Link href="/" className="text-sm text-gray-600">
            <IoLogoLinkedin />
          </Link>
          <Link href="/" className="text-sm text-gray-600">
            <IoLogoInstagram />
          </Link>
          <Link href="/" className="text-sm text-gray-600">
            <FaSquareFacebook />
          </Link>
          <Link href="/" className="text-sm text-gray-600">
            <IoLogoTwitter />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuestFooter;
