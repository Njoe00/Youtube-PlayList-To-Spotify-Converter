import React from "react";
import LoginCard from "@/components/page";

export default function Header({
  logout,
  token,
}: {
  logout: () => void;
  token: string | null;
}) {
  const headerSections = [
    "Home",
    "Services",
    "About",
    "Testimonials",
    "Clients",
    "Contact",
  ];

  return (
    <div className="flex justify-between items-center flex-row w-screen h-[87px] bg-white z-20 will-change-auto border-b-[1px] fixed">
      <div className="text-2xl text-black relative font-semibold ml-8">
        Soundly
      </div>
      <div className="flex">
        {headerSections.map((headerSection, index) => (
          <button
            key={index}
            className="hover:text-primary-color text-black font-[280] px-2.5 h-[49px] text-lg"
          >
            {headerSection}
          </button>
        ))}
      </div>
      <LoginCard token={token} logout={logout} />
    </div>
  );
}
