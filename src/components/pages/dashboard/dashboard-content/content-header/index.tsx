import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/store-client/src/components/common/button";

type ContentHeaderProps = {
  title: string;
  btnText: string;
  path: string;
  icon?: ReactNode;
};

export const ContentHeader: FC<ContentHeaderProps> = ({
  title,
  btnText,
  path,
  icon = null,
}) => {
  return (
    <div className="app-content-header">
      <h1 className="app-content-headerText">{title}</h1>
      <Link to={path}>
        <Button type="button">
          {icon && icon} {btnText}
        </Button>
      </Link>
    </div>
  );
};
