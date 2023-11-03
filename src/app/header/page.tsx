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
    <div className="flex justify-center flex-row w-[1080px] h-10">
      {headerSections.map((headerSection, index) => (
        <button className="hover:text-primary-color text-black font-thin px-2.5 h-[49px] text-lg text-center">
          {headerSection}
        </button>
      ))}
    </div>
  );
}
