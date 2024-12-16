import { FC } from "react";
import { ProductT } from "@/store-client/src/types";
import { ContentListItem } from "./content-list-item";
import { ContentListHeader } from "./content-list-header";
import "./styles.scss";

type ContentListView = {
  isCardView: boolean;
  products: ProductT[];
  userId: number;
};

export const ContentListView: FC<ContentListView> = ({
  isCardView,
  products,
  userId,
}) => {
  return (
    <div
      className={`products-area-wrapper ${
        isCardView ? "gridView" : "tableView"
      } `}
    >
      <ContentListHeader />
      {products.map((product) => (
        <ContentListItem key={product.id} userId={userId} product={product} />
      ))}
    </div>
  );
};
