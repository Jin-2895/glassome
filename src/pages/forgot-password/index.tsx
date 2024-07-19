import { NextPage } from "next";
import { ForgotPassword as ForgotPasswordContent } from "../../shared/components/Auth";
import {
  Header,
  Footer,
  PublicRoute,
  NavigationMenu,
} from "../../shared/components/Common";
import { Divider, Layout } from "../../shared/ui";

const ForgotPassword: NextPage = () => {
  return (
    <PublicRoute>
      <Layout header={<NavigationMenu />} footer={<Footer />}>
        <Header />
        <ForgotPasswordContent />
        <Divider />
      </Layout>
    </PublicRoute>
  );
};

export default ForgotPassword;
