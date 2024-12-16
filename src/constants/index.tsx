import { productDetailNameT } from "../types";

export const productDetailsName: productDetailNameT[] = [
  {
    key: "image",
    name: "Items",
  },
  {
    key: "price",
    name: "Price",
  },
  {
    key: "status-cell",
    name: "Status",
  },
  {
    key: "discountedPrice",
    name: "Discounted Price",
  },
  {
    key: "description",
    name: "Description",
  },
];

export const defaultUresAvatar = "/images/default-avatar.jpg";
export const defaultProductImage = "/images/default-product.png";
export const allowedFileTypes = ["image/jpeg", "image/png"];
export const maxFileSize = 2 * 1024 * 1024; // 2MB
export const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
export const passwordHelperText =
  "Password must be between 6 and 32 characters, and include at least one uppercase letter, one lowercase letter, and one number.";
