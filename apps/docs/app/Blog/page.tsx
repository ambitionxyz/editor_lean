import AddPost from "../../components/addPost/AddPost";
import ListPort from "../../components/post/ListPost";
import Story from "../../components/story/Story";

const Page = () => {
  return (
    <div className="w-full h-full">
      <Story />
      <AddPost />
      <ListPort />
    </div>
  );
};

export default Page;
