const Layout = (props: any) => {
  return (
    <div className="flex w-full h-full">
      <div className="w-[360px]">trai</div>
      <div className="flex-1">{props.children}</div>
    </div>
  );
};

export default Layout;
