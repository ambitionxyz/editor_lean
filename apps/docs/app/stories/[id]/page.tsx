"use client";

import { useParams, useRouter } from "next/navigation";

import { useContext, useEffect, useRef, useState } from "react";
import { StoryContext } from "../../../context/StoryContext";
import { Pause, Play, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { useToggle } from "@mantine/hooks";

const Page = () => {
  const vidRef = useRef<any>(null);
  const router = useRouter();
  const [pause, toggle] = useToggle([true, false]);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const { currentStory, setCurrentStory, listStory } = useContext(StoryContext);

  function moveStories(isNext: boolean) {
    if (isNext) {
      const indexNext = listStory.data.indexOf(currentStory);
      setCurrentStory(listStory.data[indexNext + 1]);
      router.push(`/stories/${indexNext}`);
    }
    //is previous
    else {
      const indexPre = listStory.data.indexOf(currentStory);
      setCurrentStory(listStory.data[indexPre - 1]);
      router.push(`/stories/${indexPre}`);
    }
  }

  const data = {
    avartar:
      "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-08.jpg",
    name: "Hôm nào cũng buồn",
  };
  const { name, avartar } = data;

  useEffect(() => {
    console.log(vidRef.current);
    if (pause) {
      vidRef.current.play();
    } else {
      vidRef.current.pause();
    }
  }, [pause]);

  useEffect(() => {
    const videoElement = vidRef.current;

    const updateDuration = () => {
      setDuration(Math.floor(videoElement.duration));
    };

    const updateTime = () => {
      setCurrentTime(Math.floor(videoElement.currentTime));
    };

    const onVideoEnded = () => {
      console.log("Video đã kết thúc!");
      toggle();
    };

    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", updateDuration);
      videoElement.addEventListener("timeupdate", updateTime);
      videoElement.addEventListener("ended", onVideoEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("loadedmetadata", updateDuration);
        videoElement.removeEventListener("timeupdate", updateTime);
        videoElement.removeEventListener("ended", onVideoEnded);
      }
    };
  }, []);

  const onSeek = (e: any) => {
    const seekTime = e.target.value;
    vidRef.current.currentTime = seekTime;
    setCurrentTime(Math.floor(seekTime));
  };

  return (
    <div className="bg-black flex mx-auto justify-center w-full h-full ">
      <div className="w-[535px] relative mt-4  rounded-md h-[90%] shadow-lg shadow-indigo-500/40">
        <div className="flex justify-center h-1 w-[98%] my-4">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={onSeek}
            className="h-full w-full"
          />
        </div>
        <div className=" h-[40px] flex justify-between  m-4 ">
          <div className="flex w-full h-full gap-x-1 items-center">
            <div className="h-[36px] w-[36px] p-2 overflow-hidden rounded-full bg-slate-800 border-solid border-2 border-sky-500">
              <img
                className="object-cover h-full w-full"
                src={avartar}
                alt="avatar"
              />
            </div>

            <a href="#">
              <span className="font-semibold leading-none hover:underline">
                {name}
              </span>
            </a>
            <span className="text-sm leading-none">
              <Globe size={16} strokeWidth={0.5} />
            </span>
          </div>
          <div className="flex">
            <div onClick={() => toggle()}>{pause ? <Pause /> : <Play />}</div>
          </div>
        </div>
        <video ref={vidRef} className="w-full h-full">
          <source src={currentStory.attributes.video} type="video/mp4" />
        </video>

        <div className="absolute top-[50%] cursor-pointer left-[-55px] flex items-center justify-center h-[40px] w-[40px] rounded-full shadow-lg shadow-indigo-500/40">
          <ChevronLeft
            onClick={() => {
              moveStories(false);
            }}
          />
        </div>

        <div className="absolute top-[50%] cursor-pointer right-[-55px] flex items-center justify-center h-[40px] w-[40px] rounded-full  shadow-lg shadow-indigo-500/40">
          <ChevronRight
            onClick={() => {
              moveStories(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
