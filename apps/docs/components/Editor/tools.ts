import axios from "axios";

import SimpleImage from "@editorjs/simple-image";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";
import { TimeLineBlock } from "../customBock/TimeLineBlock";
import PostTool from "../customBock/PostBlock";

export const tools = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  postTool: {
    class: PostTool,
    config: {
      uploader: {
        uploadByFile(file: any) {
          let formData = new FormData();
          formData.append("files", file, file);

          return axios
            .post("http://localhost:1337/api/upload", formData)
            .then((response) => {
              //after success
              const url = response.data[0].url;
              return {
                success: 1,
                file: {
                  url: "http://localhost:1337" + url,
                },
              };
            })
            .catch((error) => {
              //handle error
              console.log("error", error);
              return error;
            });
        },

        async uploadByUrl(url: any) {
          await axios
            .post("http://localhost:1337/api/upload", url)
            .then((response) => {
              console.log(response);
              return {
                success: 1,
                file: {
                  url: "http://localhost:1337" + url,
                },
              };
            });
        },
      },
    },
  },
  // simpleImage: SimpleImage,
  // quote: Quote,
  // header: {
  //   class: Header,
  //   inlineToolbar: ["link"],
  // },
  // list: List,
  // linkTool: LinkTool,
  // imageTool: {
  //   class: ImageTool,
  // config: {
  //   uploader: {
  //     uploadByFile(file: any) {
  //       console.log(file);
  //       let formData = new FormData();
  //       formData.append("files", file, file);

  //       axios
  //         .post("http://localhost:1337/upload", formData)
  //         .then((response) => {
  //           //after success
  //           console.log("data", response);
  //         })
  //         .catch((error) => {
  //           //handle error
  //           console.log("data", error);
  //         });
  //     },
  //   },
  // },
  // },
  // embed: Embed,
  // timeline: TimeLineBlock,
  // paragraph: CustomParap,
  // image: CustomImage,
  // block: CustomeBlock,
};
