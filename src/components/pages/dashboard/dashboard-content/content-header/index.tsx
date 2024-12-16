import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/store-client/src/components/common/button";

type ContentHeaderProps = {
  title: string;
  btnText: string;
  path: string;
};

export const ContentHeader: FC<ContentHeaderProps> = ({
  title,
  btnText,
  path,
}) => {
  return (
    <div className="app-content-header">
      <h1 className="app-content-headerText">{title}</h1>
      <Link to={path}>
        <Button type="button">{btnText}</Button>
      </Link>
    </div>
  );
};
