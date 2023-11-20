"use client";
import React from "react";

export default function TitleCard({
  scrollToSection,
  musicCardRef,
}: {
  scrollToSection: (ref: any) => void;
  musicCardRef: React.RefObject<HTMLElement | undefined>;
}) {
  return (
    <div className="flex flex-col font-serif pl-32 pt-10 z-50">
      <h1 className="text-[90px] text-7xl flex-row font-[1000] h-[205px] w-[640.53px]">
        The Power <br />
        of Good Music
      </h1>
      <button
        onClick={() => {
          scrollToSection(musicCardRef);
        }}
        className="text-xl m-4 text-white bg-primary-color w-[250px] h-[50px] font-light rounded-full transition delay-150 duration-200 hover:bg-main-text-color ease-in-out"
      >
        Click here to start now
      </button>
    </div>
  );
}
