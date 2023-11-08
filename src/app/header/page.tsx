"use client";
import React from "react";
import LoginCard from "@/components/logincard";

export default function Header({ logout }: { logout: () => void }) {
  const headerSections = [
    "Home",
    "Services",
    "About",
    "Testimonials",
    "Clients",
    "Contact",
  ];

  return (
    <div className="flex flex-row w-full h-[87px] bg-white z-20 will-change-auto border-b-[1px] fixed">
      <div className="flex text-center items-center justify-between w-full relative">
        <div className="text-2xl text-black font-semibold ml-8">Soundly</div>
        <div className="text-center flex items-center justify-center">
          {headerSections.map((headerSection, index) => (
            <button
              key={index}
              className="hover:text-primary-color text-black font-[280] px-2.5 h-[49px] text-lg"
            >
              {headerSection}
            </button>
          ))}
        </div>
        <div>
          <LoginCard />
        </div>
      </div>
    </div>
  );
}
