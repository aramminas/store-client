import { FC, ReactNode } from "react";
import "./styles.scss";

type HoverTextProps = {
  children: ReactNode;
};

export const HoverText: FC<HoverTextProps> = ({ children }) => {
  return <h2 className="hover-text">{children}</h2>;
};
