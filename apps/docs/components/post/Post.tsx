import { MoreHorizontal, X } from "lucide-react";
import Image from "next/image";

interface PostProps {
  avartar?: string;
  images?: any;
  name?: string;
  createTime?: string;
  content?: string;
}

const ImageList = ({ images }: { images: any[] }) => {
  if (images.length === 0) {
    return <></>;
  } else if (images.length === 1) {
    return (
      <div className="overflow-hidden pt-[12px]">
        <img
          className="object-fill  h-full w-full"
          src={images[0]}
          alt="image"
        />
      </div>
    );
  } else {
    return (
      <div className="overflow-hidden pt-[12px]">
        {images.map((image, key) => {
          return (
            <img
              key={key}
              className="object-fill  h-full w-full"
              src={image}
              alt="image"
            />
          );
        })}
      </div>
    );
  }
};

const Post = ({ avartar, images, name, content, createTime }: PostProps) => {
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
      {content && <div className="pt-[12px] px-[16px]">{content}</div>}
      <ImageList images={images} />
    </div>
  );
};

export default Post;
