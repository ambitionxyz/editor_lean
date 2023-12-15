import { MoreHorizontal, X } from "lucide-react";
import Image from "next/image";

interface PostProps {
  avartar?: string;
  image?: string;
  name?: string;
  createTime?: string;
  content?: string;
}

const Post = ({ avartar, image, name, content, createTime }: PostProps) => {
  return (
    <div className="rounded-md w-full  bg-slate-600 mb-6">
      <div className=" h-[36px] w-full pt-[12px] px-[16px] mb-[12px]">
        <div className="flex justify-between h-[36px] w-full ">
          <div className="flex gap-x-2 ">
            <div className="flex h-full w-[36px] overflow-hidden rounded-full bg-slate-800 border-solid border-2 border-sky-500">
              <img
                className="object-cover h-full w-full"
                src={avartar}
                alt="avatar"
              />
            </div>
            <div className="flex flex-col ">
              <a href="#">
                <span className="font-semibold leading-none hover:underline">
                  {name}
                </span>
              </a>
              <span className="text-sm leading-none">{createTime}</span>
            </div>
          </div>
          <div className="flex gap-x-1 ">
            <div className="flex items-center cursor-pointer justify-center h-full w-[36px] overflow-hidden rounded-full hover:bg-slate-800 ">
              <MoreHorizontal />
            </div>
            <div className="flex items-center cursor-pointer justify-center h-full w-[36px] overflow-hidden rounded-full hover:bg-slate-800 ">
              <X />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[12px] px-[16px]">{content}</div>
      {image && (
        <div className="overflow-hidden">
          <img className="object-fill  h-full w-full" src={image} alt="image" />
        </div>
      )}
    </div>
  );
};

export default Post;