"use client";

import { Users, History, Pocket, ChevronDown } from "lucide-react";
import SideBarItem from "./SidebarItem";
import SideBarProfile from "./SideBarProfile";

const SideBar = () => {
  const sidebarLinks = [
    {
      label: "Bạn bè",
      icon: Users,
      href: "/Blog/Friends",
    },
    {
      label: "Kỉ niệm",
      icon: History,
      href: "/Blog/Story",
    },
    {
      label: "Đã lưu",
      icon: Pocket,
      href: "/Blog/Saved",
    },
    {
      label: "Kỉ niệm",
      icon: History,
      href: "/Blog/Story",
    },
    {
      label: "Kỉ niệm",
      icon: History,
      href: "/Blog/Story",
    },
    {
      label: "Xem thêm",
      icon: ChevronDown,
      href: "/Blog/Extends",
    },
  ];
  return (
    <div className="w-[360px]  h-full ">
      <div className="mt-4 mb-2   border-solid border-2 border-t-0 border-r-0 border-l-0  border-slate-500">
        <SideBarProfile />
        {sidebarLinks.map((sidebarItem, index) => (
          <SideBarItem
            key={index}
            label={sidebarItem.label}
            icon={sidebarItem.icon}
            href={sidebarItem.href}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
