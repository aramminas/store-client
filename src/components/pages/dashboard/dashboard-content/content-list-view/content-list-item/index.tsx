import { FC } from "react";
import { Link } from "react-router-dom";
import { imgUrl } from "@/store-client/src/utils";
import { ProductT } from "@/store-client/src/types";
import { defaultProductImage } from "@/store-client/src/constants";

type ContentListItemProps = {
  userId: number;
  product: ProductT;
};

export const ContentListItem: FC<ContentListItemProps> = ({
  product,
  userId,
}) => {
  return (
    <div className="products-row">
      <div className="product-cell image">
        <img
          src={
            product.imageUrl ? imgUrl(product.imageUrl) : defaultProductImage
          }
          alt={product.name}
        />
        <span className="product-link">
          <Link to={`/product-details/${product.id}`}>{product.name}</Link>
        </span>
      </div>
      <div className="product-cell price">
        <span className="cell-label">Price:</span> ${product.price}
      </div>
      <div className="product-cell status-cell">
        <span className="cell-label">Status:</span>
        <span
          className={`status ${
            userId === product.creatorId ? "active" : "disabled"
          }`}
        >
          Owner
        </span>
      </div>
      <div className="product-cell sales">
        <span className="cell-label">Discounted Price:</span>
        {product.discountedPrice ? `$${product.discountedPrice}` : "-"}
      </div>
      <div className="product-cell description desc-content">
        <span className="cell-label">Description:</span>
        <span className="desc-text-content">
          {product.description ? product.description : "-"}
        </span>
      </div>
    </div>
  );
};
