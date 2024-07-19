import { NextPage } from "next";
import { SignIn as SignInContent } from "../../shared/components/Auth";
import {
  Header,
  Footer,
  PublicRoute,
  NavigationMenu,
} from "../../shared/components/Common";
import { Divider, Layout } from "../../shared/ui";

const SignIn: NextPage = () => {
  return (
    <PublicRoute>
      <Layout header={<NavigationMenu />} footer={<Footer />}>
        <Header />
        <SignInContent />
        <Divider />
      </Layout>
    </PublicRoute>
  );
};

export default SignIn;
