import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { ProductT } from "../../types";
import apiHandler from "../../constants/api";
import { useGetData } from "../../hooks/useGetProduct";
import { Alert } from "../../components/common/alert";
import { Loader } from "../../components/common/loader";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchProducts } from "../../store/slices/products.slice";
import { PageContentWrapper } from "../../components/common/switch/page-content-wrapper";
import { ContentHeader } from "../../components/pages/dashboard/dashboard-content/content-header";
import { ProductDetailsContent } from "../../components/pages/product-details/product-details-content";

export const ProductDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.data);
  const { data, error, loading } = useGetData<ProductT>(
    `products/${params.id}`
  );

  const deleteProduct = async () => {
    const response = await apiHandler(`products/${params.id}`, {
      method: "DELETE",
    });

    if (response.error) {
      toast.error("Failed to remove product");
      return;
    }

    toast.success("The product was successfully removed");
    dispatch(fetchProducts());
    navigate("/");
  };

  return (
    <>
      <ContentHeader title="Product Details" btnText="All Products" path="/" />
      <PageContentWrapper>
        {loading && <Loader />}
        {error && <Alert type="error">{error}</Alert>}
        {data && (
          <ProductDetailsContent
            userId={user?.id || 0}
            product={data}
            deleteProduct={deleteProduct}
          />
        )}
      </PageContentWrapper>
    </>
  );
};
