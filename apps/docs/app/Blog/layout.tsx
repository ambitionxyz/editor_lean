import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className="w-full h-full mx-auto bg-slate-800 ">
      <Header />
      <main className="flex justify-between h-full mt-[60px]  px-4 ">
        <SideBar />
        <div className="w-[690px] h-full rounded-md overflow-auto-y">
          {children}
        </div>
        <div className="w-[350px] h-full">right</div>
      </main>
    </div>
  );
};

export default Layout;
