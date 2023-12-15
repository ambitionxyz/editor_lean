import { FC } from "react";

export function withStyles(Component: FC<any>) {
  return (props: any) => {
    console.log("props", props);
    const style = { padding: "0.2rem", margin: "1rem" };
    return <Component style={style} {...props} />;
  };
}
