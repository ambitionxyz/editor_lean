"use client";

import EditorJS, { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import React, { useEffect, useState } from "react";

import { tools } from "./tools";
import classes from "./edittor.module.css";

export const useEditor = (
  toolsList: {
    [toolName: string]: ToolConstructable | ToolSettings<any> | any;
  },
  { data, editorRef }: { data: any; editorRef: any },
  options: EditorJS.EditorConfig = {}
) => {
  const [editorInstance, setEditor] = useState<any | null>(null);
  const {
    data: ignoreData,
    tools: ignoreTools,
    holder: ignoreHolder,
    ...editorOptions
  } = options;

  // initialize
  useEffect(() => {
    // create instance
    const editor = new EditorJS({
      holder: "editorjs",
      tools: toolsList,
      data: data || {},
      initialBlock: "paragraph",

      ...editorOptions,
    });

    setEditor(editor);

    // cleanup
    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
          setEditor(null);
        })
        .catch((e) => console.error("ERROR editor cleanup", e));
    };
  }, [toolsList]);

  // set reference
  useEffect(() => {
    if (!editorInstance) {
      return;
    }
    // Send instance to the parent
    if (editorRef) {
      editorRef(editorInstance);
    }
  }, [editorInstance, editorRef]);

  return { editor: editorInstance };
};

export const EditorContainer = ({
  editorRef,
  children,
  data,
  options,
}: {
  editorRef: any;
  children?: any;
  data: any;
  options: any;
}) => {
  const editor = useEditor(tools, { data, editorRef }, options);

  return (
    <>
      {!children && <div className={classes.sessions} id="editorjs"></div>}
      {children}
    </>
  );
};
