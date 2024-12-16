import { BiSort } from "react-icons/bi";
import { productDetailsName } from "@/store-client/src/constants";

export const ContentListHeader = () => {
  return (
    <div className="products-header">
      {productDetailsName.map((item) => (
        <div key={item.key} className={`product-cell ${item.key}`}>
          {item.name}
          <button className="sort-button">
            <BiSort />
          </button>
        </div>
      ))}
    </div>
  );
};
