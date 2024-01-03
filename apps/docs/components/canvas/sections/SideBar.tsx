"use client";

import { LayoutTemplate, Type, Image, Blocks } from "lucide-react";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
  const tabs = [
    { name: "Templates", icon: LayoutTemplate, key: "templates" },
    {
      name: "Texts",
      icon: Type,
      key: "text-templates",
    },
    {
      name: "Images",
      icon: Image,
      key: "unsplash",
    },
    {
      name: "Shapes",
      icon: Blocks,
      key: "unsplash",
    },
  ];

  return (
    <div className=" w-[72px] h-full">
      {tabs.length > 0 &&
        tabs.map((tab) => {
          return (
            <SideBarItem
              name={tab.name}
              icon={tab.icon}
              key={tab.key}
              keyItem={tab.key}
            />
          );
        })}
    </div>
  );
};

export default SideBar;
