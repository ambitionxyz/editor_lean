"use client";
import dynamic from "next/dynamic";
import { ElementRef, useEffect, useRef, useState } from "react";

import {
  useLoadData,
  options,
  useSaveCallback,
  useSetData,
  useClearDataCallback,
} from "./editor";

import classes from "./TimelineE.module.css";
import { Button } from "@mantine/core";
import { useLocal } from "../hooks/useLocal";

const Editor = dynamic<{
  editorRef: any;
  children?: any;
  data: any;
  options: any;
}>(() => import("./editor/editor").then((mod) => mod.EditorContainer), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const TimelineE = () => {
  const [editor, setEditor] = useState(null);

  // save handler
  // const onSave = useSaveCallback(editor);

  // load data
  const { data, loading } = useLoadData();

  // set saved data
  useSetData(editor, data);

  // clear data callback
  const clearData = useClearDataCallback(editor);

  const disabled = editor === null || loading;

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1 className={classes.title}> Timeline 😅</h1>

        {Editor && (
          <Editor editorRef={setEditor} options={options} data={data}></Editor>
        )}

        <div className={classes.button}>
          {/* <Button
            loading={disabled}
            onClick={onSave}
            variant="gradient"
            gradient={{ from: "violet", to: "orange", deg: 181 }}
          >
            Save
          </Button> */}
        </div>
      </div>
    </div>
  );
};
export default TimelineE;
