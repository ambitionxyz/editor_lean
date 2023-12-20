"use client";

import { Button, FileInput, Modal } from "@mantine/core";
import { useModal } from "../../hooks/useModal";
import { Globe, Image, Smile } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  options,
  useClearDataCallback,
  // useHandleEvents,
  useLoadData,
  useSaveCallback,
  useSetData,
} from "../editor";
import { useData } from "../../hooks/useData";
import axios from "axios";

const Editor = dynamic<{
  editorRef: any;
  children?: any;
  data: any;
  options: any;
}>(() => import("../editor/editor").then((mod) => mod.EditorContainer), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const AddPostModal = () => {
  console.log("render");
  const btnShowImage = useRef<any>(null);
  const [image, SetImage] = useState<{
    id: number;
    url: string;
  } | null>();
  const [editor, setEditor] = useState(null);

  const { data: dataModal, isOpen, onClose, type, onOpen } = useModal();
  const { data, onChangeData } = useData();
  const { avartar, name } = dataModal;

  const isModalOpen = isOpen && type === "createPost";

  const callBack = (dataCallback: any) => {
    data.data.push(dataCallback);
    onChangeData(data);
  };

  const show = useCallback(() => {
    console.log("--whuy", btnShowImage.current);
    const customData = {};
    const event = new CustomEvent("showBtn", {
      detail: customData,
    });
    window.dispatchEvent(event); // Kích hoạt sự kiện
  }, []);

  // save handler
  const onSave = useSaveCallback(editor, "create", callBack);

  return (
    <Modal.Root opened={isModalOpen} onClose={onClose} centered size={500}>
      <Modal.Overlay />
      <Modal.Content className="!border-solid !border-[1px] !border-slate-500 ">
        <Modal.Header className="!h-[60px] !bg-slate-800 border-solid border-t-0 border-r-0 border-l-0 border-slate-500">
          <Modal.Title className="!flex !items-center !ml-[160px] !text-xl  !font-bold">
            Tạo bài viết
          </Modal.Title>
          <Modal.CloseButton className="!rounded-full !bg-[#3A3B3C] !w-[36px] !h-[36px]" />
        </Modal.Header>
        <Modal.Body className="!p-[16px] bg-slate-800">
          <div className="flex h-[36px] gap-x-2 ">
            <div className="flex h-full w-[36px] overflow-hidden rounded-full bg-slate-800 border-solid border-2 border-sky-500">
              <img
                className="object-cover h-full w-full"
                src={avartar}
                alt="avatar"
              />
            </div>
            <div className="flex flex-col box-border pb-5">
              <a href="#">
                <span className="font-semibold leading-none hover:underline">
                  {name}
                </span>
              </a>
              <span className="relative ">
                <Globe size={16} />
                <span className="text-sm leading-none absolute top-0 ml-1">
                  Công khai
                </span>
              </span>
            </div>
          </div>
          <div className="w-full h-full">
            {Editor && (
              <Editor
                editorRef={setEditor}
                options={options}
                data={null}
              ></Editor>
            )}
          </div>

          <div className="h-[58px] flex items-center justify-between border-solid rounded-lg border-[1px] border-slate-500 p-2 mt-4">
            <div className="px-2">Thêm vào bài viết của bạn</div>
            <div className="w-[240px] h-[36px] flex gap-x-1">
              <div
                ref={btnShowImage}
                onClick={() => {
                  show();
                }}
                className="flex items-center cursor-pointer justify-center h-full w-[36px] overflow-hidden rounded-full hover:bg-slate-800 "
              >
                <Image color="#14a800" />
              </div>
              <div className="flex items-center cursor-pointer justify-center h-full w-[36px] overflow-hidden rounded-full hover:bg-slate-800 ">
                <Image color="#14a800" />
              </div>
              <div className="flex items-center cursor-pointer justify-center h-full w-[36px] overflow-hidden rounded-full hover:bg-slate-800 ">
                <Image color="#14a800" />
              </div>
              <div className="flex items-center cursor-pointer justify-center h-full w-[36px] overflow-hidden rounded-full hover:bg-slate-800 ">
                <Image color="#14a800" />
              </div>
              <div className="flex items-center cursor-pointer justify-center h-full w-[36px] overflow-hidden rounded-full hover:bg-slate-800 ">
                <Image color="#14a800" />
              </div>
              <div className="flex items-center cursor-pointer justify-center h-full w-[36px] overflow-hidden rounded-full hover:bg-slate-800 ">
                <Image color="#14a800" />
              </div>
            </div>
          </div>
          <Button fullWidth onClick={onSave} className="mt-4">
            Đăng
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default AddPostModal;
