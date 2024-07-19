import { NextPage } from "next";
import { NavigationMenu } from "../../shared/components/Common";
import {
  DetailedTutorialList,
  WearWithProduct,
} from "../../shared/components/Detailed";
import { Layout } from "../../shared/ui";

const TutorialsDetailed: NextPage = () => (
  <Layout header={<NavigationMenu />}>
    <WearWithProduct withCategories={false} withTutorials />
    <DetailedTutorialList />
  </Layout>
);

export default TutorialsDetailed;
