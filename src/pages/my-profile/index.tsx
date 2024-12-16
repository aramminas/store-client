import { UserInfo } from "../../components/user-info";
import { PageContentWrapper } from "../../components/common/switch/page-content-wrapper";
import { ContentHeader } from "../../components/pages/dashboard/dashboard-content/content-header";

export const MyProfile = () => {
  return (
    <div>
      <ContentHeader title="Profile Details" btnText="All Products" path="/" />
      <PageContentWrapper>
        <UserInfo />
      </PageContentWrapper>
    </div>
  );
};
