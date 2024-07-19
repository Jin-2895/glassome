import { NextPage } from "next";
import { OwnRoutine } from "../../shared/components/Contribution";
import { Layout } from "../../shared/ui";
import { NavigationMenu } from "../../shared/components/Common";

const OwnContribution: NextPage = () => {
  return (
    <Layout header={<NavigationMenu />}>
      <OwnRoutine />
    </Layout>
  );
};

export default OwnContribution;
