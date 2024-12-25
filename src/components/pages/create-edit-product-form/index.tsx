import { FC, FormEvent, useRef, useState } from "react";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

import { Button } from "../../common/button";
import { imgUrl } from "@/store-client/src/utils";
import { ErrorText } from "../../common/error-text";
import apiHandler from "@/store-client/src/constants/api";
import { useAppDispatch, useAppSelector } from "@/store-client/src/store";
import { CreateProductFormInputT, ProductT } from "@/store-client/src/types";
import { fetchProducts } from "@/store-client/src/store/slices/products.slice";
import { actionProductValidator } from "@/store-client/src/utils/form-validator";
import "./styles.scss";

type CreateEditProductFormProps = {
  product?: ProductT;
  userId?: number;
  refetch?: () => Promise<void>;
};
export const CreateEditProductForm: FC<CreateEditProductFormProps> = ({
  product,
  userId,
  refetch,
}) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const user = useAppSelector((state) => state.user.data);

  const handleActionProduct = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setError(null);
    const form = ev.target as HTMLFormElement;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const price = (form.elements.namedItem("price") as HTMLInputElement).value;
    const discountedPrice = (
      form.elements.namedItem("discounted-price") as HTMLInputElement
    ).value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;

    const fileInput = form.elements.namedItem("image") as HTMLInputElement;
    const file = fileInput?.files?.[0];

    const formData = {
      name,
      price: +price,
      discountedPrice: +discountedPrice || undefined,
      description: description || undefined,
      image: file || null,
    };

    const { error } = await actionProductValidator(formData);

    if (error) {
      setError(error.message);
      return;
    }

    sendCreateProductFormData(formData);
  };

  const sendCreateProductFormData = async (data: CreateProductFormInputT) => {
    const formData = new FormData();

    for (const name in data) {
      const itemName = name as keyof CreateProductFormInputT;
      const itemValue = data[itemName];

      if (itemValue && itemValue instanceof Blob) {
        if (itemValue.type.startsWith("image/")) {
          formData.append(itemName, itemValue);
        }
      } else if (itemValue) {
        if (typeof itemValue === "string") {
          formData.append(itemName, itemValue);
        } else {
          formData.append(itemName, JSON.stringify(itemValue));
        }
      }
    }

    if (user?.id) {
      formData.append("creatorId", String(user.id));
    }

    if (userId) {
      const response = await apiHandler(`products/${product?.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (response.error) {
        setError(response.error);
        return;
      }

      toast.success("Product updated successfully 🎉");
      dispatch(fetchProducts());

      refetch?.();
      return;
    }

    const response = await apiHandler("products", {
      method: "POST",
      body: formData,
    });

    if (response.error) {
      setError(response.error);
      return;
    }

    if (response.status === 201) {
      toast.success("Product created successfully 🎉");
      formRef?.current?.reset();
      dispatch(fetchProducts());
    }
  };

  return (
    <div className="product-form-content">
      {product?.imageUrl && (
        <div className="product-image-content">
          <img src={imgUrl(product?.imageUrl)} alt={product?.name} />
        </div>
      )}
      <form ref={formRef} onSubmit={handleActionProduct}>
        <label htmlFor="product-name" className="form-input">
          Name
        </label>
        <input
          id="product-name"
          type="text"
          name="name"
          className="form-input"
          placeholder="Enter product name"
          defaultValue={product?.name || ""}
        />

        <label htmlFor="product-price" className="form-input">
          Price
        </label>
        <input
          id="product-price"
          type="number"
          name="price"
          className="form-input"
          placeholder="Enter product price"
          defaultValue={product?.price || ""}
        />

        <label htmlFor="discounted-price" className="form-input">
          Discounted price
        </label>
        <input
          id="discounted-price"
          type="number"
          name="discounted-price"
          className="form-input"
          placeholder="Enter discounted price"
          defaultValue={product?.discountedPrice || ""}
        />

        <label htmlFor="product-image" className="form-input">
          Choose a product picture:
        </label>
        <input
          type="file"
          id="product-image"
          name="image"
          className="product-image"
          accept="image/png, image/jpeg"
        />

        <label htmlFor="product-description" className="form-input">
          Product Description
        </label>
        <textarea
          name="description"
          rows={8}
          id="product-description"
          defaultValue={product?.description || ""}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <div className="action-block">
          <Button type="submit">
            <FaSave />
            {product?.id ? "Edit" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};
