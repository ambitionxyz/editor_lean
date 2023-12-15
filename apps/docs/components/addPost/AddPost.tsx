"use client";

import { Video, Image, Smile } from "lucide-react";
import { useModal } from "../../hooks/useModal";

const AddPost = () => {
  const { data, onOpen } = useModal();
  const { name, avartar } = data;
  return (
    <div className="rounded-md w-full bg-slate-600 mt-6  pt-[12px] px-[16px] pb-[10px]">
      <div className="flex gap-x-2 w-full ">
        <div className="flex h-[36px] w-[36px] overflow-hidden rounded-full bg-slate-800 border-solid border-2 border-sky-500">
          <img
            className="object-cover h-full w-full"
            src={avartar}
            alt="avatar"
          />
        </div>
        <div className="w-full">
          <div
            onClick={() => onOpen("createPost")}
            className="flex cursor-pointer items-center w-full h-[40px] rounded-full bg-[#3A3B3C]"
          >
            <span className="ml-4">{name} ơi, Bạn đang nghĩ gì thế?</span>
          </div>
        </div>
      </div>
      <div className="flex items-center  border-solid border-b-0 border-r-0 border-l-0 border-slate-500 mt-2">
        <div className="flex gap-x-2 cursor-pointer h-[40px] rounded-md items-center justify-center basis-1/3 hover:bg-[#3A3B3C] mt-1.5">
          <Video color="#a80032" />
          <span>Video trực tiếp</span>
        </div>

        <div className="flex gap-x-2 cursor-pointer h-[40px] rounded-md items-center justify-center basis-1/3 hover:bg-[#3A3B3C] mt-1.5">
          <Image color="#14a800" />
          <span>Ảnh/video</span>
        </div>

        <div className="flex gap-x-2 cursor-pointer h-[40px] rounded-md items-center justify-center basis-1/3 hover:bg-[#3A3B3C] mt-1.5">
          <Smile color="#fbff1a" />
          <span>Cảm xúc/hoạt động</span>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
