"use client";

import dynamic from "next/dynamic";

import classes from "./Demo.module.css";
import {
  useLoadData,
  options,
  useSaveCallback,
  useSetData,
  useClearDataCallback,
} from "./Editor";
import { useState } from "react";
import { Button, NavLink } from "@mantine/core";
import { Image, UserPlus, Video } from "lucide-react";

const Editor = dynamic<{
  editorRef: any;
  children?: any;
  data: any;
  options: any;
}>(
  () =>
    import("../components/Editor/editor").then((mod) => mod.EditorContainer),
  { ssr: false }
);

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
  const onSave = useSaveCallback(editor);

  // load data
  const { data, loading } = useLoadData();

  // set saved data
  useSetData(editor, data);

  // clear data callback
  const clearData = useClearDataCallback(editor);

  const disabled = editor === null || loading;

  return (
    <div className={classes.DemoWrapper}>
      <div className="editorContainer">
        <Editor editorRef={setEditor} options={options} data={data}></Editor>
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
        <Button fullWidth disabled={disabled} onClick={onSave}>
          Đăng
        </Button>
      </div>
      <div>POST</div>
    </div>
  );
}

export default Demo;
