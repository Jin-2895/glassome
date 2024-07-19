import { NextPage } from "next";
import { SignUp as SignUpContent } from "../../shared/components/Auth";
import {
  Header,
  Footer,
  PublicRoute,
  NavigationMenu,
} from "../../shared/components/Common";
import { Divider, Layout } from "../../shared/ui";

const SignUp: NextPage = () => {
  return (
    <PublicRoute>
      <Layout header={<NavigationMenu />} footer={<Footer />}>
        <Header />
        <SignUpContent />
        <Divider />
      </Layout>
    </PublicRoute>
  );
};

export default SignUp;
