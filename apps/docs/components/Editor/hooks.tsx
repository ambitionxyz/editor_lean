import { useCallback, useState, useEffect } from "react";
import { isEmpty } from "lodash";

import initialData from "./data.json";
import { useLocal } from "../../hooks/useLocal";
import { useData } from "../../hooks/useData";
import { useModal } from "../../hooks/useModal";

export const dataKey = "editorData";

type SaveType = "create" | "edit";

export const useSaveCallback = (
  editor: any,
  type: SaveType,
  callBack: any,
  bgrColor: string
) => {
  const { onClose } = useModal();

  return useCallback(async () => {
    if (!editor) {
      return;
    }
    try {
      const out = await editor.save();
      out.bgrColor = bgrColor;
      console.log(out);
      console.log({ bgrColor });

      if (out.blocks.length === 0) {
        onClose();
        return;
      } else {
        const res = await fetch("http://localhost:1337/api/post2s", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: out,
            meta: {},
          }),
        });

        if (!res.ok) {
          console.log("ERRORR POST");
        }
        const data = await res.json();

        callBack(data.data);
      }

      onClose();
    } catch (e) {
      console.error("SAVE RESULT failed", e);
    }
  }, [editor, type, callBack]);
};

// Set editor data after initializing
export const useSetData = (editor: any, data: any) => {
  useEffect(() => {
    if (!editor || !data) {
      return;
    }

    editor.isReady.then(() => {
      setTimeout(() => {
        editor.render(data);
      }, 100);
    });
  }, [editor, data]);
};

// load saved data
export const useLoadData = () => {
  const { dataStore } = useLocal();
  const [data, setData] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);

  // Mimic async data load
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(true);
      const id = setTimeout(async () => {
        console.group("EDITOR load data");
        // const saved = localStorage.getItem(dataKey);
        const saved = dataStore;

        if (isEmpty(saved)) {
          console.info("No saved data, fetching API...");
          const res = await (
            await fetch("http://localhost:1337/api/components/1")
          ).json();
          const data = res.data.attributes;
          setData(data);
        } else if (saved?.blocks?.length === 0) {
          console.info("No saved data, using initial");

          // setData(initialData);
          setData(null);
        } else {
          setData(saved);
        }

        setLoading(false);
      }, 200);

      return () => {
        setLoading(false);
        clearTimeout(id);
      };
    }
  }, [dataStore]);

  return { data, loading };
};

export const useClearDataCallback = (editor: any) => {
  return useCallback(
    (ev: any) => {
      ev.preventDefault();
      if (!editor) {
        return;
      }
      editor.isReady.then(() => {
        // fixing an annoying warning in Chrome `addRange(): The given range isn't in document.`
        setTimeout(() => {
          editor.clear();
        }, 100);
      });
    },
    [editor]
  );
};
