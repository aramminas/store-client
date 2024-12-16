import { FC } from "react";
import { Link } from "react-router-dom";
import { RiEditFill } from "react-icons/ri";
import { RiDeleteBin2Fill } from "react-icons/ri";

import { Button } from "../../../common/button";
import { imgUrl } from "@/store-client/src/utils";
import { ProductT } from "@/store-client/src/types";
import { defaultProductImage } from "@/store-client/src/constants";
import "./styles.scss";

type ProductDetailsContentProps = {
  product: ProductT;
  userId: number;
  deleteProduct: () => Promise<void>;
};

export const ProductDetailsContent: FC<ProductDetailsContentProps> = ({
  product,
  userId,
  deleteProduct,
}) => {
  return (
    <div className="product-details-content">
      <div className="product-img">
        <img
          src={
            product.imageUrl ? imgUrl(product.imageUrl) : defaultProductImage
          }
          alt={product.name}
        />
      </div>
      <div>
        <h2>{product.name}</h2>
        <div className="product-description">
          <p>
            Price: <span>${product.price}</span>
          </p>
          <p className="product-status">
            Status:
            <span
              className={`status ${
                userId === product.creatorId ? "active" : "disabled"
              }`}
            >
              Owner
            </span>
          </p>
          <p>
            Discounted Price:
            <span>
              {product.discountedPrice ? `$${product.discountedPrice}` : "-"}
            </span>
          </p>
          <p>
            Description:
            <span className="desc-content">
              {product.description ? product.description : "-"}
            </span>
          </p>
          {userId === product.creatorId && (
            <div className="action-btn">
              <Button className="error" type="button" onClick={deleteProduct}>
                <RiDeleteBin2Fill />
                Delite product
              </Button>

              <Link to={`/edit-product/${product.id}`}>
                <Button>
                  <RiEditFill />
                  Edit product
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
