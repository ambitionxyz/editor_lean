"use client";

import Link from "next/link";
import Image from "next/image";
import { useModal } from "../../hooks/useModal";

interface SideBarItemProps {
  label: string;
  icon: any;
  href: string;
}
const SideBarItem = ({ label, icon, href }: SideBarItemProps) => {
  const Icon = icon;
  return (
    <div className="flex items-center cursor-pointer rounded-lg h-[52px] hover:bg-[#3A3B3C]">
      <Link href={href} className="px-2 flex items-center w-full h-full ">
        <div className="py-2 pr-4 flex items-center">
          <Icon />
        </div>
        <span className="font-semibold ">{label}</span>
      </Link>
    </div>
  );
};

export default SideBarItem;
