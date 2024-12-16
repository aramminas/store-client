import { CreateEditProductForm } from "../../components/pages/create-edit-product-form";
import { PageContentWrapper } from "../../components/common/switch/page-content-wrapper";
import { ContentHeader } from "../../components/pages/dashboard/dashboard-content/content-header";

export const CreateProduct = () => {
  return (
    <div>
      <ContentHeader title="New Product" btnText="All Products" path="/" />
      <PageContentWrapper>
        <CreateEditProductForm />
      </PageContentWrapper>
    </div>
  );
};
