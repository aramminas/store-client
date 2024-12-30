import { FC, ReactNode } from "react";
import "./styles.scss";

type Animation3DTextProps = {
  children: ReactNode;
  small?: boolean;
};

export const Animation3DText: FC<Animation3DTextProps> = ({
  children,
  small,
}) => {
  return (
    <div className="animation-text-container">
      <div className={`animation-text ${small ? "small" : ""}`}>
        <h3>{children}</h3>
      </div>
    </div>
  );
};
