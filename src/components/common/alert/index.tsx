import { FC, ReactNode } from "react";
import "./styles.scss";

type AlertProps = {
  type: "info" | "success" | "warning" | "error";
  text?: string;
  children: ReactNode;
};
export const Alert: FC<AlertProps> = ({ children, type, text }) => {
  return (
    <div className="alert-content">
      <div className={type}>
        <span className="title">{children}</span>
        {text && <span className="text">{text}</span>}
      </div>
    </div>
  );
};
