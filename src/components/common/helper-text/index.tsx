import { FC, ReactNode } from "react";
import "./styles.scss";

type HelperTextProps = {
  children: ReactNode;
};

export const HelperText: FC<HelperTextProps> = ({ children }) => {
  return <small className="helper-text">{children}</small>;
};
