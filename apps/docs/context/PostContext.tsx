import { MoreHorizontal } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocal } from "../hooks/useLocal";
import Post from "../components/post/Post";
import { useModal } from "../hooks/useModal";
import { useData } from "../hooks/useData";

const PostContext = createContext<any>([]);

function PostListContent(props: any) {
  const [loading, SetLoading] = useState(false);
  const [open, toggle] = useState(false);
  const [remove, setRemove] = useState();
  const [listPost, setListPost] = useState<[] | undefined>([]);

  const { onChangeData } = useData();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data");
      SetLoading(true);
      const res = await fetch("http://localhost:1337/api/posts");

      if (!res.ok) {
        console.log("ERROR FETCH DATA");
      } else {
        const data = await res.json();
        if (data.data.length > 0) {
          onChangeData(data);
        }
      }
      SetLoading(false);
    };
    fetchData();
  }, []);

  return (
    <PostContext.Provider
      value={{
        open,
        toggle,
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

function Button(props: any) {
  const Icon = props.icon;
  return (
    <button>
      <Icon />
    </button>
  );
}

function GroupButton() {
  const { open, toggle } = useContext(PostContext);
  const { remove, setRemove } = useContext(PostContext);
  return (
    <div className="flex">
      <div onClick={() => toggle(!open)}>
        <Button icon={MoreHorizontal} />
      </div>
      <div onClick={() => setRemove("dem")}>
        <Button icon={MoreHorizontal} />
      </div>
    </div>
  );
}

function List() {
  const { loading } = useContext(PostContext);
  const { data } = useModal();
  const { data: listPost } = useData();

  if (loading === true) {
    return <div className="text-center uppercase ">Loading...</div>;
  }
  if (listPost.length === 0 && loading === false) {
    return <div className="text-center uppercase ">No content.</div>;
  }
  return (
    <>
      {listPost.data.reverse().map((post: any, index: number) => {
        const { createTime, image, content } = post.attributes;
        return (
          <Post
            key={index}
            avartar={data.avartar}
            image="https://tooys.mx/media/catalog/product/cache/39c7ff5a74bd9fa282a021db605b774d/i/t/itachi-uchiha__estatua-por-espada-art-00.jpg"
            name={data.name}
            createTime={createTime}
            content={content}
          />
        );
      })}
    </>
  );
}

PostListContent.List = List;
PostListContent.GroupButton = GroupButton;

export default PostListContent;