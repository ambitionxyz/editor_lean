"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { useModal } from "../../hooks/useModal";

const AddStory = () => {
  const { data } = useModal();
  return (
    <Link
      href="demo"
      className="relative basis-1/4 bg-slate-600 rounded-md overflow-hidden "
    >
      <div className="w-full h-[201px] object-fill overflow-hidden">
        <img
          src={data.avartar}
          className="w-full h-full transition duration-700 ease-in-out hover:scale-110"
        />
      </div>

      <div className="absolute right-[46px] top-[185px]  ">
        <div className="flex items-center over mx-auto justify-center h-[40px] w-[40px] rounded-full bg-blue-600 border-solid border-slate-600 border-4">
          <Plus />
        </div>
        <span>Tạo tin</span>
      </div>
    </Link>
  );
};

export default AddStory;
