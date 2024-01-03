"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useModal } from "../hooks/useModal";
import Link from "next/link";
import { Plus } from "lucide-react";
import StoryItem from "../components/story/StoryItem";

export const StoryContext = createContext<any>([]);

function StoryListContent(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [listStory, setListStory] = useState<any>([]);
  const [currentStory, setCurrentStory] = useState<any>();

  useEffect(() => {
    const fetchingDataVideo = async () => {
      console.log("fetching data story");
      setLoading(true);

      const res = await fetch("http://localhost:1337/api/Stories");

      if (!res.ok) {
        console.log("ERROR FETCHING DATA STORY");
      } else {
        const data = await res.json();
        setListStory(data);
        setLoading(false);
        console.log(data);
      }
    };

    fetchingDataVideo();
  }, []);

  const hasPreStory = () => {
    const listCheck = listStory.data.slice().reverse();
    console.log("listCheck", listCheck);
    console.log("currentStory !== listCheck[0]", currentStory !== listCheck[0]);
    return currentStory !== listCheck[0];
  };

  const hasNextStory = () => {
    const listCheck = listStory.data.slice().reverse();
    console.log(
      "currentStory !== listCheck[listCheck.length - 1]",
      currentStory !== listCheck[listCheck.length - 1]
    );
    return currentStory !== listCheck[listCheck.length - 1];
  };

  return (
    <StoryContext.Provider
      value={{
        loading,
        setLoading,
        currentStory,
        setCurrentStory,
        listStory,
        setListStory,
        hasNextStory,
        hasPreStory,
      }}
    >
      <div className="w-full h-full">{props.children}</div>
    </StoryContext.Provider>
  );
}

function ListStory() {
  const { loading, listStory } = useContext(StoryContext);
  const { data } = useModal();

  if (loading) {
    return <div className="text-center uppercase ">Loading...</div>;
  }
  if (listStory.length === 0) {
    return <div className="text-center uppercase ">No content.</div>;
  }

  const listRender = listStory.data.slice().reverse();

  return (
    <div className="flex flex-row gap-x-2 w-full h-full overflow-hidden">
      <Link
        href="demo"
        className="block relative shrink-0  w-[140.63px] bg-slate-600 rounded-md overflow-hidden "
      >
        <div className="w-full h-[201px] object-fill overflow-hidden">
          <img
            src={data.avartar}
            className="w-full h-full transition duration-700 ease-in-out hover:scale-110"
          />
        </div>

        <div className="absolute right-[60px] top-[185px]  ">
          <div className="flex items-center over mx-auto justify-center h-[40px] w-[40px] rounded-full bg-blue-600 border-solid border-slate-600 border-4">
            <Plus />
          </div>
          <span>Tạo tin</span>
        </div>
      </Link>
      {listRender.map((item: any, i: number) => {
        const src = item.attributes.video as string;
        return <StoryItem key={i} src={src} data={data} id={item.id} />;
      })}
    </div>
  );
}

StoryListContent.ListStory = ListStory;

export default StoryListContent;
