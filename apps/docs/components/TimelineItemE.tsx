import React from "react";

import classes from "./TimelineItem.module.css";

interface TimelineItemProps {
  onDataChange: (event: any) => void;
  onKeyDown: (event: any) => void;
  data: {
    dataItem: string;
    itemCreated: string;
  };
}
const TimelineItemE = ({
  onDataChange,
  onKeyDown,
  data,
}: TimelineItemProps) => {
  const { dataItem, itemCreated } = data;

  const renderTime = itemCreated
    ? itemCreated
    : new Date().toLocaleTimeString();
  return (
    <div className={classes.item}>
      <div className={classes.time}>{renderTime}</div>
      <input
        type="text"
        className={classes.content}
        defaultValue={dataItem}
        onChange={onDataChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default TimelineItemE;
