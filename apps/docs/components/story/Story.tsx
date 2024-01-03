"use client";
import StoryListContent from "../../context/StoryContext";
import AddStory from "./AddStory";
import StoryItem from "./StoryItem";

const Story = () => {
  return (
    <div className="h-[250px] w-full mt-4 rounded-l-lg ">
      <StoryListContent.ListStory />
    </div>
  );
};

export default Story;
