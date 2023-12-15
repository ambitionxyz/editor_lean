import SimpleImage from "@editorjs/simple-image";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";
import { TimeLineBlock } from "../customBock/TimeLineBlock";
import axios from "axios";

export const tools = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  // simpleImage: SimpleImage,
  // quote: Quote,
  // header: {
  //   class: Header,
  //   inlineToolbar: ["link"],
  // },
  // list: List,
  // linkTool: LinkTool,
  imageTool: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile(file: any) {
          console.log(file);
          let formData = new FormData();
          formData.append("files", file, file);

          axios
            .post("http://localhost:1337/upload", formData)
            .then((response) => {
              //after success
              console.log("data", response);
            })
            .catch((error) => {
              //handle error
              console.log("data", error);
            });

          // return fetch("http://localhost:1337/uploads", {
          //   headers: {
          //     // "Content-Type": "application/json",
          //     "Content-Type": "application/x-www-form-urlencoded",
          //   },
          //   method: "POST",
          //   body: formData,
          // })
          //   .then((res) => {
          //     return res.json();
          //   })
          //   .then((data) => {
          //     console.log("data", data);
          //     return {
          //       success: 1,
          //       file: {
          //         url: "https://utfs.io/f/",
          //       },
          //     };
          //   });
        },
      },
    },
  },
  // embed: Embed,
  timeline: TimeLineBlock,
  // paragraph: CustomParap,
  // image: CustomImage,
  // block: CustomeBlock,
};
