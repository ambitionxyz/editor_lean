import { useCallback, useState, useEffect } from "react";
import { isEmpty } from "lodash";

import initialData from "./data.json";
import { useLocal } from "../../hooks/useLocal";

export const dataKey = "editorData";

export const useSaveCallback = (editor: any) => {
  const { addLocal } = useLocal();
  return useCallback(async () => {
    if (!editor) return;
    try {
      const out = await editor.save();
      console.group("EDITOR onSave");
      console.dir(out);

      console.log(
        "===>",
        JSON.stringify({
          data: out,
          meta: {},
        })
      );

      await fetch("http://localhost:1337/api/components/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: out,
          meta: {},
        }),
      });

      addLocal(out);
      // localStorage.setItem(dataKey, JSON.stringify(out));
      console.info("Saved in localStorage");
      console.groupEnd();
    } catch (e) {
      console.error("SAVE RESULT failed", e);
    }
  }, [editor]);
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
          // console.dir(initialData);
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
