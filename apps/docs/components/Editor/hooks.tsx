import { useCallback, useState, useEffect } from "react";

import initialData from "./data.json";
import { useLocal } from "../../hooks/useLocal";
import useStore from "../../hooks/useStore";

export const useSaveCallback = (editor: any) => {
  const { addLocal } = useLocal();

  return useCallback(async () => {
    if (!editor) return;
    try {
      const out = await editor.save();
      console.group("EDITOR onSave");
      console.dir(out);
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
      const id = setTimeout(() => {
        console.group("EDITOR load data");
        const saved = dataStore;
        if (saved) {
          const parsed = dataStore;
          setData(parsed);
          console.dir(parsed);
        } else {
          console.info("No saved data, using initial");
          console.dir(initialData);
          // setData(initialData);
          setData(null);
        }
        console.groupEnd();
        setLoading(false);
      }, 200);

      return () => {
        setLoading(false);
        clearTimeout(id);
      };
    }
  }, []);

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
