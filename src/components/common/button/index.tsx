import { FC, ReactNode } from "react";
import "./styles.scss";

type ButtonProps = {
  children: ReactNode;
  className?: "primary" | "error";
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  className = "",
  onClick,
}) => {
  return (
    <button
      className={`primary-button ${className}`}
      type={type}
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
};
