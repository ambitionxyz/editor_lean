import SideBar from "../../components/canvas/sections/SideBar";
import FeatureSideBar from "../../components/canvas/sections/features/FeatureSideBar";
import TopBar from "../../components/canvas/topbar/TopBar";

const Layout = (props: any) => {
  return (
    <div className="w-full h-full">
      <TopBar />
      <div className="flex w-full h-screen-minus-50px ">
        <SideBar />
        <FeatureSideBar />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
