"use client";

import EditorJS, { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import React, { useEffect, useState } from "react";
import { tools } from "./tools";

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
      autofocus: true,
      tools: toolsList,
      data: data || {},

      defaultBlock: "image",
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
      console.log("editorRef", editorRef);
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
  useEditor(tools, { data, editorRef }, options);

  return (
    <>
      {!children && <div className="container" id="editorjs"></div>}
      {children}
      <style jsx>{`
        .container {
          width: 100%;
          min-height: 500px;
          border: 1px solid #c0c0c0;
          padding: 2px 0;
        }
      `}</style>
    </>
  );
};