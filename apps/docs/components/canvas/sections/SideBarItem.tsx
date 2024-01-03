"use client";

import { memo, useCallback, useContext } from "react";
import { CanvasContext } from "../hooks/useCanvas";
import { twMerge } from "tailwind-merge";

interface SideBarItemProps {
  name: string;
  icon: any;
  keyItem: string;
}

// const SideBarContent = memo(({ onClick }) => {});

const SideBarItem = ({ name, icon: Icon, keyItem }: SideBarItemProps) => {
  const { curentSection, setCurentSection, fetchFeature } =
    useContext(CanvasContext);

  const isActive = keyItem === curentSection;

  const handleClick = useCallback(() => {
    console.log(keyItem);
    setCurentSection(keyItem);
    //call API fetch data --> set data
    fetchFeature(keyItem);
  }, []);

  return (
    <div
      onClick={handleClick}
      className={twMerge(
        `w-[72px] h-[72px] gap-y-1 flex flex-col items-center justify-center hover:bg-blue-600`,
        isActive ? "bg-blue-600" : ""
      )}
    >
      <Icon />
      <div className="text-xs">{name}</div>
    </div>
  );
};

export default SideBarItem;
