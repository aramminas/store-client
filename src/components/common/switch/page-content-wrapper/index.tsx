import { FC, ReactNode } from "react";
import "./styles.scss";

type PageContentWrapperProps = {
  children: ReactNode;
};

export const PageContentWrapper: FC<PageContentWrapperProps> = ({
  children,
}) => {
  return (
    <div className="content-wrapper">
      <div className="content-body-wrapper">{children}</div>
    </div>
  );
};
