import { NextPage } from "next";
import { Profile as ProfileContent } from "../../shared/components/Profile";
import {
  Footer,
  Header,
  NavigationMenu,
  PrivateRoute,
} from "../../shared/components/Common";
import { Divider, Layout } from "../../shared/ui";

const Profile: NextPage = () => {
  return (
    <PrivateRoute>
      <Layout header={<NavigationMenu />} footer={<Footer />}>
        <Header />
        <ProfileContent />
        <Divider />
      </Layout>
    </PrivateRoute>
  );
};

export default Profile;
