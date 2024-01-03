"use client";

import { createContext, useEffect, useState } from "react";
import { API } from "../API/api";
import { useData } from "../../../hooks/useData";

export const CanvasContext = createContext<any>(null);

function CanvasProvider(props: any) {
  const [loading, setLoading] = useState<string>("idle");
  const [curentSection, setCurentSection] = useState<string>("text-templates");

  const { onChangeData } = useData();

  const fetchSection = async (typeAPI: string) => {
    console.log("Fetching section...");

    try {
      setLoading("pending");
      const res = await fetch(typeAPI);
      setLoading("successfully");
      if (!res.ok) {
        console.log("ERROR FETCH DATA");
        setLoading("rejected");
      } else {
        const data = await res.json();
        console.log("----------------->", data);
        if (data.items.length > 0) {
          //save data
          onChangeData(data);
        }
      }
    } catch (error) {
      console.log("ERROR FETCH DATA", error);
      setLoading("rejected");
    }
  };

  const fetchFeature = (typeFeature: string) => {
    const typeAPI = typeFeatureMapAPI(typeFeature);
    if (typeAPI === "") {
      throw new Error("Unknown type feature: " + typeFeature);
    }
    fetchSection(typeAPI);
  };

  useEffect(() => {
    fetchSection(API.TEXT_API);
  }, []);

  return (
    <CanvasContext.Provider
      value={{ curentSection, setCurentSection, fetchFeature }}
    >
      {props.children}
    </CanvasContext.Provider>
  );
}

const typeFeatureMapAPI = (typeFeature: string): string => {
  switch (typeFeature) {
    case "templates":
      return API.TEMPLATE_API;
    case "text-templates":
      return API.TEXT_API;
    case "unsplash":
      return API.UNSPLASH_API;
    default:
      return "";
  }
};

export default CanvasProvider;
