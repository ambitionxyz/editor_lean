"use client";

import { Button, Modal } from "@mantine/core";
import { useModal } from "../../hooks/useModal";
import { Globe } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  options,
  useClearDataCallback,
  useLoadData,
  useSaveCallback,
  useSetData,
} from "../editor";
import { useData } from "../../hooks/useData";

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
  const { data: dataModal, isOpen, onClose, type, onOpen } = useModal();
  const { data } = useData();
  const { avartar, name } = dataModal;
  const { onChangeData } = useData();
  const isModalOpen = isOpen && type === "createPost";

  const [editor, setEditor] = useState(null);

  const callBack = (dataCallback: any) => {
    data.data.push(dataCallback);
    onChangeData(data);
  };

  // save handler
  const onSave = useSaveCallback(editor, "create", callBack);

  return (
    <Modal.Root opened={isModalOpen} onClose={onClose} centered size={500}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header className="!h-[60px] border-solid border-t-0 border-r-0 border-l-0 border-slate-500">
          <Modal.Title className="!flex !items-center !ml-[160px] !text-xl  !font-bold">
            Tạo bài viết
          </Modal.Title>
          <Modal.CloseButton className="!rounded-full !bg-[#3A3B3C] !w-[36px] !h-[36px]" />
        </Modal.Header>
        <Modal.Body className="!p-[16px]">
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
          <div className="overflow-hidden w-full h-[400px]">
            {Editor && (
              <Editor
                editorRef={setEditor}
                options={options}
                data={null}
              ></Editor>
            )}
          </div>
          <Button fullWidth onClick={onSave}>
            Đăng
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default AddPostModal;
