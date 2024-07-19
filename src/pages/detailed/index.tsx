import { NextPage } from "next";
import { NavigationMenu } from "../../shared/components/Common";
import {
  LookingForProducts,
  WearWithProduct,
} from "../../shared/components/Detailed";
import { Layout } from "../../shared/ui";

const Detailed: NextPage = () => (
  <Layout header={<NavigationMenu />}>
    <WearWithProduct />
    <LookingForProducts />
  </Layout>
);

export default Detailed;
