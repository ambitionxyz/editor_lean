import SimpleImage from "@editorjs/simple-image";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";
import { TimeLineBlock } from "../customBock/TimeLineBlock";

export const tools = {
  // paragraph: {
  //   class: Paragraph,
  //   inlineToolbar: true,
  // },
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
  //   config: {
  //     uploader: {
  //       uploadByFile(file: any) {
  //         return fetch("/api/uploadthing?actionType=upload&slug=serverImage", {
  //           method: "POST",
  //           body: JSON.stringify({
  //             files: [
  //               {
  //                 name: file.name,
  //                 size: file.size,
  //               },
  //             ],
  //           }),
  //         })
  //           .then((res) => {
  //             return res.json();
  //           })
  //           .then((data) => {
  //             const dataImage = data[0]?.key;
  //             return {
  //               success: 1,
  //               file: {
  //                 url: "https://utfs.io/f/" + dataImage,
  //               },
  //             };
  //           });
  //       },
  //     },
  //   },
  // },
  // embed: Embed,
  timeline: TimeLineBlock,
  // paragraph: CustomParap,
  // image: CustomImage,
  // block: CustomeBlock,
};
