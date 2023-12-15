"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

const HeaderItem = ({
  label,
  icon,
  isActive,
  href,
}: {
  label: string;
  icon: any;
  isActive: boolean;
  href: string;
}) => {
  const Icon = icon;
  return (
    <div
      className={twMerge(
        `flex items-center justify-center basis-1/5`,
        isActive &&
          "border-solid border-t-0 border-l-0 border-r-0 border-b-2 border-indigo-500"
      )}
    >
      <Link
        href={href}
        className={twMerge(
          `flex items-center justify-center rounded-xl w-full h-[45px]  `,
          !isActive && "hover:bg-[#3A3B3C]"
        )}
      >
        <Icon className={isActive ? "text-indigo-500" : ""} />
      </Link>
    </div>
  );
};

export default HeaderItem;
