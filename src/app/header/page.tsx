import React, { useState } from "react";

export default function Header() {
  const headerSections = [
    "Home",
    "Services",
    "About",
    "Testimonials",
    "Clients",
    "Contact",
  ];

  return (
    <div className="flex justify-between items-center flex-row w-screen h-[87px] bg-white z-20 border-b-[1px]">
      <div className="text-2xl text-black relative font-semibold ml-8">
        BizBud
      </div>
      <div className="flex">
        {headerSections.map((headerSection, index) => (
          <button className="hover:text-primary-color text-black font-[280] px-2.5 h-[49px] text-lg">
            {headerSection}
          </button>
        ))}
      </div>
      <button className="text-xl bg-primary-color w-[140px] h-[50px] font-light rounded-full mr-10 hover:bg-black ease-in-out">
        Call Now
      </button>
    </div>
  );
}