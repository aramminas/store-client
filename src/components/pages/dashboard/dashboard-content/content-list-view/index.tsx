import { FC } from "react";
import { ProductT } from "@/store-client/src/types";
import { ContentListItem } from "./content-list-item";
import { ContentListHeader } from "./content-list-header";
import { Animation3DText } from "@/store-client/src/components/common/animation-3d-text";
import "./styles.scss";

type ContentListView = {
  isCardView: boolean;
  products: ProductT[];
  userId: number;
  total: number;
};

export const ContentListView: FC<ContentListView> = ({
  isCardView,
  products,
  userId,
  total,
}) => {
  return (
    <div
      className={`products-area-wrapper ${
        isCardView ? "gridView" : "tableView"
      } `}
    >
      <Animation3DText small>Total: {total}</Animation3DText>
      <ContentListHeader />
      {products.map((product) => (
        <ContentListItem key={product.id} userId={userId} product={product} />
      ))}
    </div>
  );
};
