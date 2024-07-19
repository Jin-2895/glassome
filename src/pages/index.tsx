import {
  BuildRecommendationEngine,
  MakeUpGuide,
  PopularProducts,
} from "../shared/components/Home";
import {
  Footer,
  GuideBanner,
  NavigationMenu,
} from "../shared/components/Common";
import { Divider, Layout } from "../shared/ui";

const Index = () => {
  return (
    <Layout header={<GuideBanner />} footer={<Footer />}>
      <Divider />
      <NavigationMenu />
      <MakeUpGuide />
      <PopularProducts />
      <BuildRecommendationEngine />
    </Layout>
  );
};

export default Index;
