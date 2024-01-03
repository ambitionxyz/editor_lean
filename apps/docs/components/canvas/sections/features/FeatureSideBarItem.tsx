"use client";

import { useContext } from "react";
import { CanvasContext } from "../../hooks/useCanvas";

interface FeatureSideBarItemProps {
  json: string;
  preview: string;
  type: string;
}

const FeatureSideBarItem = ({
  json,
  preview,
  type,
}: FeatureSideBarItemProps) => {
  const { curentSection } = useContext(CanvasContext);

  return (
    <div className="cursor-pointer">
      <img className="w-full h-full" src={preview} alt="image feature" />
    </div>
  );
};

export default FeatureSideBarItem;
