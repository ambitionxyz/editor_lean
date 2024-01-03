import { MoreHorizontal } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocal } from "../hooks/useLocal";
import Post from "../components/post/Post";
import { useModal } from "../hooks/useModal";
import { useData } from "../hooks/useData";

const PostContext = createContext<any>([]);

function PostListContent(props: any) {
  const [loading, SetLoading] = useState("idle");
  const [remove, setRemove] = useState();
  const [listPost, setListPost] = useState<[] | undefined>([]);

  const { onChangeData } = useData();

  const fetchData = async () => {
    console.log("Fetching data");
    try {
      SetLoading("pending");
      const res = await fetch("http://localhost:1337/api/post2s");
      SetLoading("successfully");
      if (!res.ok) {
        console.log("ERROR FETCH DATA");
        SetLoading("rejected");
      } else {
        const data = await res.json();
        if (data.data.length > 0) {
          onChangeData(data);
        }
      }
    } catch (error) {
      console.log("ERROR FETCH DATA");
      SetLoading("rejected");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PostContext.Provider
      value={{
        remove,
        setRemove,
        listPost,
        setListPost,
        loading,
      }}
    >
      <div className="w-full mt-6 h-full ">{props.children}</div>
    </PostContext.Provider>
  );
}

function List() {
  const { loading } = useContext(PostContext);
  const { data } = useModal();
  const { data: listPost } = useData();

  if (loading === "pending" || loading === "idle") {
    return <div className="text-center uppercase ">Loading...</div>;
  }
  if (listPost.length === 0) {
    return <div className="text-center uppercase ">No content.</div>;
  }
  if (loading === "rejected") {
    return (
      <div className="text-center uppercase ">Upps, an error occurred.</div>
    );
  }
  const listRender = listPost.data.slice().reverse();

  return (
    <>
      {listRender.map((post: any, index: number) => {
        const { createdAt, blocks, bgrColor } = post.attributes;

        return (
          <Post
            key={index}
            bgrColor={bgrColor}
            avartar={data.avartar}
            blocks={blocks}
            name={data.name}
            createTime={createdAt}
          />
        );
      })}
    </>
  );
}

PostListContent.List = List;

export default PostListContent;
