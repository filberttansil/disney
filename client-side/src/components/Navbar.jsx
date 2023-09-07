import React from "react";
import {
  HiHome,
  HiMagnifyingGlass,
  HiStar,
  HiPlayCircle,
  HiTv,
} from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";

import NavbarItem from "./NavbarItems";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const menu = [
    { name: "SEARCH", icon: HiMagnifyingGlass },
    { name: "WATCH LIST", icon: HiPlus },
    { name: "ORIGINALS", icon: HiStar },
    { name: "MOVIES", icon: HiPlayCircle },
    { name: "SERIES", icon: HiTv },
  ];
  const handleClick = () => {
    navigate("/maintenance");
  };
  return (
    <nav className="flex items-center justify-between bg-blue-950  p-5">
      <div className="flex gap-8 items-center">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="text-white flex items-center gap-3 text-[15px] font-semibold cursor-pointer hover:underline underline-offset-8"
        >
          <p className="pr-10">DISNEY+</p>
          <HiHome />
          <p className="text-white">HOME</p>
        </div>
        {menu.map((item, idx) => (
          <NavbarItem
            handleClick={handleClick}
            key={idx}
            name={item.name}
            Icon={item.icon}
          />
        ))}
      </div>
      <img
        src="https://i.pinimg.com/564x/5f/c8/b3/5fc8b318ea9b030fb1abc2d1add6dfe8.jpg"
        className="w-[40px] h-[40px] rounded-full"
      />
    </nav>
  );
}
