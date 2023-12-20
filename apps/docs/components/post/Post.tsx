import { MoreHorizontal, X } from "lucide-react";
import Image from "next/image";

interface PostProps {
  avartar?: string;
  blocks: any[];
  name?: string;
  createTime: string;
}

const ImageList = ({ file }: any) => {
  if (file.length === 0) {
    return <></>;
  } else if (file.length === 1) {
    return (
      <div className="overflow-hidden pt-[12px]">
        <img
          className="object-fill  h-full w-full"
          src={file[0].url}
          alt="image"
        />
      </div>
    );
  } else {
    return (
      <div className="overflow-hidden pt-[12px]">
        {file.map((image: any, key: number) => {
          return (
            <img
              key={key}
              className="object-fill  h-full w-full"
              src={image.url}
              alt="image"
            />
          );
        })}
      </div>
    );
  }
};

const RenderContent = ({ blocks }: { blocks: any[] }) => {
  return blocks.map((block, index) => {
    if (block.type === "postTool") {
      return <ImageList file={block.data.file} />;
    }
    if (block.type === "paragraph") {
      return <div className="pt-[12px] px-[16px]">{block.data.text}</div>;
    }
  });
};

const Post = ({ avartar, blocks, name, createTime }: PostProps) => {
  const date = new Date(createTime);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const formattedDate: string = `${day} tháng ${month} lúc ${hours}:${minutes}`;

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
              <span className="text-sm leading-none">{formattedDate}</span>
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
      <RenderContent blocks={blocks} />
    </div>
  );
};

export default Post;
