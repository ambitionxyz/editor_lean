"use client";

import Link from "next/link";
import { useModal } from "../../hooks/useModal";

const SideBarProfile = () => {
  const { data } = useModal();
  return (
    <div className="flex items-center rounded-sm h-[52px] hover:bg-[#3A3B3C]">
      <Link href="/demo" className="px-2 flex items-center">
        <div className="py-2 pr-4 flex items-center">
          <img
            src={data.avartar}
            alt="avt"
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>
        <span className="font-semibold text-xl">{data.name}</span>
      </Link>
    </div>
  );
};

export default SideBarProfile;
