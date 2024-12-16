import { FC, ReactNode } from "react";
import "./styles.scss";

type ErrorTextProps = {
  children: ReactNode;
};

export const ErrorText: FC<ErrorTextProps> = ({ children }) => {
  return <small className="error-text">{children}</small>;
};
