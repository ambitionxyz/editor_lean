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

  return (
    <li className={classes.item}>
      <div className={classes.time}>{itemCreated}</div>
      <input
        type="text"
        defaultValue={dataItem}
        onChange={onDataChange}
        onKeyDown={onKeyDown}
      />
    </li>
  );
};

export default TimelineItemE;
