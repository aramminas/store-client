import { useParams } from "react-router-dom";
import { ProductT } from "../../types";
import { useAppSelector } from "../../store";
import { Alert } from "../../components/common/alert";
import { useGetData } from "../../hooks/useGetProduct";
import { Loader } from "../../components/common/loader";
import { CreateEditProductForm } from "../../components/pages/create-edit-product-form";
import { PageContentWrapper } from "../../components/common/switch/page-content-wrapper";
import { ContentHeader } from "../../components/pages/dashboard/dashboard-content/content-header";

export const EditProduct = () => {
  const params = useParams();
  const user = useAppSelector((state) => state.user.data);
  const { data, error, loading, refetch } = useGetData<ProductT>(
    `products/${params.id}`
  );

  return (
    <div>
      <ContentHeader title="Edit Product" btnText="All Products" path="/" />
      <PageContentWrapper>
        {loading && <Loader />}
        {error && <Alert type="error">{error}</Alert>}
        {data && (
          <CreateEditProductForm
            userId={user?.id}
            product={data}
            refetch={refetch}
          />
        )}
      </PageContentWrapper>
    </div>
  );
};
