import React from "react";

export default function TitleCard() {
  return (
    <div className="flex flex-col text-[#16163F] font-serif pl-32">
      <h1 className="text-[90px] text-7xl flex-row font-[1000] h-[205px] w-[640.53px]">
        The Power <br />
        of Good Music
      </h1>
      <h2 className="text-xl font-thin w-[300px] p-4">
        Add your playlist link below
      </h2>
      <button className="text-xl m-4 text-white bg-primary-color w-[140px] h-[50px] font-light rounded-full hover:bg-black ease-in-out">
        Click Here
      </button>
    </div>
  );
}
