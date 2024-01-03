"use client";

import { useContext, useState } from "react";
import { useData } from "../../../../hooks/useData";
import FeatureSideBarItem from "./FeatureSideBarItem";
import { CanvasContext } from "../../hooks/useCanvas";

const FeatureSideBar = () => {
  const { data } = useData();
  const { curentSection } = useContext(CanvasContext);
  console.log(data);
  return (
    <div className=" flex-none w-[330px] px-[10px] h-full border-solid border-slate-700 border-t-transparent  overflow-y-hidden">
      <div className="h-[40px]">Text</div>
      <div className="grid grid-cols-2 gap-2 overflow-y-auto">
        {data?.items?.length > 0 &&
          data.items.map((item: any, i: number) => {
            return (
              <FeatureSideBarItem key={i} type={curentSection} {...item} />
            );
          })}
      </div>
    </div>
  );
};

export default FeatureSideBar;
