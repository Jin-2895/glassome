import { NextPage } from "next";
import {
  Footer,
  Header,
  NavigationMenu,
  PrivateRoute,
} from "../../../shared/components/Common";
import { MakeUp } from "../../../shared/components/Profile";
import { Divider, Layout } from "../../../shared/ui";

const ProfileFavorites: NextPage = () => {
  return (
    <PrivateRoute>
      <Layout header={<NavigationMenu />} footer={<Footer />}>
        <Header />
        <MakeUp />
        <Divider />
      </Layout>
    </PrivateRoute>
  );
};

export default ProfileFavorites;
