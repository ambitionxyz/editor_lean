"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronRight, Globe, Image } from "lucide-react";
import { Button, Modal } from "@mantine/core";
import { twMerge } from "tailwind-merge";

import { useModal } from "../../hooks/useModal";
import { useData } from "../../hooks/useData";
import { options, useSaveCallback } from "../editor";
import { useToggle } from "@mantine/hooks";

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
  const [editor, setEditor] = useState(null);
  const [disableBtn, setDisableBtn] = useState(false);
  const [brgPost, setBgrPost] = useState<string>("bg-transparent");
  const [isOpenListBgrPostColor, toggleBgrPostColor] = useToggle([true, false]);
  const [isShowListBgr, setIsShowListBrn] = useState(true);

  const { data: dataModal, isOpen, onClose, type } = useModal();
  const { data, onChangeData } = useData();
  const { avartar, name } = dataModal;

  const isModalOpen = isOpen && type === "createPost";

  const callBack = (dataCallback: any) => {
    data.data.push(dataCallback);
    onChangeData(data);
  };

  const show = useCallback(() => {
    setDisableBtn(true);
    const customData = {};
    const event = new CustomEvent("showBtn", {
      detail: customData,
    });
    window.dispatchEvent(event); // Kích hoạt sự kiện
  }, []);

  //get event
  useEffect(() => {
    const handleGetEventImageFromEditor = (e: any) => {
      if (!e.detail) {
        setIsShowListBrn(true);
      }
      setDisableBtn(e.detail);
    };

    window.addEventListener("showImage", handleGetEventImageFromEditor);

    return () => {
      window.removeEventListener("showImage", handleGetEventImageFromEditor);
    };
  }, []);

  // save handler
  const onSave = useSaveCallback(editor, "create", callBack, brgPost);

  const listColors = [
    "bg-transparent",
    "bg-white",
    "bg-blue-400",
    "bg-red-400",
    "bg-pink-400",
  ];

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

          <div className={`w-full h-full ${brgPost}`}>
            {Editor && (
              <Editor
                editorRef={setEditor}
                options={options}
                data={null}
              ></Editor>
            )}

            {isShowListBgr && (
              <div className="flex items-end h-[39.41px] gap-x-2">
                <div
                  onClick={() => {
                    toggleBgrPostColor();
                  }}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-400 cursor-pointer border-solid"
                >
                  {isOpenListBgrPostColor ? "Aa" : <ChevronRight />}
                </div>
                {!isOpenListBgrPostColor &&
                  listColors.map((color, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setBgrPost(color);
                          if (index === 0) {
                            setDisableBtn(false);
                          } else {
                            setDisableBtn(true);
                          }
                        }}
                        className={`w-8 h-8 rounded-lg ${color} cursor-pointer border-solid`}
                      />
                    );
                  })}
              </div>
            )}
          </div>

          <div className="h-[58px] flex items-center justify-between border-solid rounded-lg border-[1px] border-slate-500 p-2 mt-4">
            <div className="px-2">Thêm vào bài viết của bạn</div>
            <div className="w-[240px] h-[36px] flex gap-x-1">
              <button
                disabled={disableBtn}
                onClick={() => {
                  show();
                  setIsShowListBrn(false);
                }}
                className={twMerge(
                  `flex items-center cursor-pointer border-none justify-center h-full w-[36px] overflow-hidden rounded-full bg-slate-800 hover:bg-slate-700 `,
                  disableBtn && "bg-slate-700"
                )}
              >
                <Image color="#14a800" />
              </button>
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
