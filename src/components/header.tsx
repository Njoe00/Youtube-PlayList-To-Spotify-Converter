"use client";
import React from "react";
import LoginCard from "./loginCard";

export default function Header({
  logout,
  token,
}: {
  logout: () => void;
  token: string | null;
}) {
  const headerSections = ["Home", "Services", "About", "Contact"];

  return (
    <div className="flex flex-row w-full h-20 z-40 bg-white will-change-auto border-b-[1px] shadow-md fixed">
      <div className="flex text-center items-center justify-between w-full">
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
          <LoginCard logout={logout} token={token} />
        </div>
      </div>
    </div>
  );
}
