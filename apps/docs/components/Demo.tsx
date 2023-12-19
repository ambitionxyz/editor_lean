"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button, NavLink } from "@mantine/core";
import { Image, UserPlus, Video } from "lucide-react";

import classes from "./Demo.module.css";
import {
  useLoadData,
  options,
  useSaveCallback,
  useSetData,
  useClearDataCallback,
} from "./editor";

const Editor = dynamic<{
  editorRef: any;
  children?: any;
  data: any;
  options: any;
}>(() => import("./editor/editor").then((mod) => mod.EditorContainer), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const navLink = [
  {
    label: "Ảnh",
    icon: <Image color="#45c743" />,
    onCLick: () => {
      console.log("CLICK Ảnh");
    },
  },
  {
    label: "Video",
    icon: <Video color="#bf3131" />,
    onCLick: () => {
      console.log("CLICK Ảnh");
    },
  },
  {
    label: "Gắn thẻ bạn bè",
    icon: <UserPlus color="#2e4399" />,
    onCLick: () => {
      console.log("CLICK Ảnh");
    },
  },
];

function Demo() {
  const [editor, setEditor] = useState(null);

  // save handler
  // const onSave = useSaveCallback(editor, "create", () => {});

  // load data
  const { data, loading } = useLoadData();

  // set saved data
  useSetData(editor, data);

  // clear data callback
  const clearData = useClearDataCallback(editor);

  const disabled = editor === null || loading;

  console.log("editor", { editor });

  return (
    <div className={classes.DemoWrapper}>
      <div className="editorContainer">
        {Editor && (
          <Editor editorRef={setEditor} options={options} data={data}></Editor>
        )}
        <div>
          {navLink &&
            navLink.map((item) => {
              return (
                <NavLink
                  label={item.label}
                  onClick={item.onCLick}
                  leftSection={item.icon}
                />
              );
            })}
        </div>
        {/* <Button fullWidth disabled={disabled} onClick={onSave}>
          Đăng
        </Button> */}
      </div>
      <div>POST</div>
    </div>
  );
}

export default Demo;
