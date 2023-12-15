"use client";

import { Button, Tooltip } from "@mantine/core";
import { Facebook, Home, HomeIcon, Search, Users } from "lucide-react";
import HeaderItem from "./HeaderItem";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const Header = () => {
  const pathname = usePathname();

  const headerLink = useMemo(
    () => [
      {
        label: "Trang chủ",
        icon: Home,
        active: pathname == "/Blog",
        href: "/Blog",
      },
      {
        label: "Bạn bè",
        icon: Users,
        active: pathname == "/Blog/Friends",
        href: "/Blog/Friends",
      },
      {
        label: "Bạn bè",
        icon: Users,
        active: pathname == "/Blog/Friends",
        href: "/Blog/Friends",
      },
      {
        label: "Bạn bè",
        icon: Users,
        active: pathname == "/Blog/Friends",
        href: "/Blog/Friends",
      },
      {
        label: "Bạn bè",
        icon: Users,
        active: pathname == "/Blog/Friends",
        href: "/Blog/Friends",
      },
    ],
    [pathname]
  );

  return (
    <div className="h-[56px] bg-slate-900 fixed top-0 w-full">
      <div className="h-full flex items-center justify-between px-4 ">
        <div className="flex xl:w-[360px] min-w-[112px gap-x-2">
          <div className="rounded-full w-[40px] h-[40px] bg-blue-600 flex justify-center items-center">
            <Facebook color="#ffffff" strokeWidth={3} absoluteStrokeWidth />
          </div>
          <div className="rounded-full w-[40px] h-[40px] bg-[#3A3B3C] flex justify-center items-center">
            <Search
              size={16}
              color="#ffffff"
              strokeWidth={0.75}
              absoluteStrokeWidth
            />
          </div>
        </div>
        <div className=" flex w-[690px] h-full ">
          {headerLink &&
            headerLink?.map((link, index) => {
              return (
                <HeaderItem
                  key={index}
                  label={link.label}
                  icon={link.icon}
                  isActive={link.active}
                  href={link.href}
                />
              );
            })}
        </div>
        <div className="min-w-[360px] pr-1">tinh nang</div>
      </div>
    </div>
  );
};

export default Header;
