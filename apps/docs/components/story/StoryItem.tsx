"use client";

import { useRouter } from "next/navigation";

import { useContext, useRef } from "react";
import { StoryContext } from "../../context/StoryContext";

interface StoryProps {
  src: string;
  data: any;
  id: any;
}
function StoryItem({ src, data, id }: StoryProps) {
  const router = useRouter();
  const { currentStory, setCurrentStory, listStory } = useContext(StoryContext);
  const { name, avartar } = data;

  const handleClick = () => {
    const currenVideoOnClick = listStory.data.find(
      (story: { id: any }) => story.id === id
    );
    setCurrentStory(currenVideoOnClick);
    router.push(`/stories/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className=" w-[140.63px] shrink-0  bg-slate-600 rounded-md cursor-pointer"
    >
      <div className="flex h-[36px] w-[36px] overflow-hidden rounded-full bg-slate-800 border-solid border-2 border-sky-500 mt-2 ml-2">
        <img
          className="object-cover h-full w-full"
          src={avartar}
          alt="avatar"
        />
      </div>

      <video className="w-full h-full transition duration-700 ease-in-out hover:scale-110">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
export default StoryItem;
