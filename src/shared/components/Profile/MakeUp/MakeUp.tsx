import React, { FC } from "react";
import { Container } from "../../../ui";
import { MakeUpContent } from "../MakeUpContent/MakeUpContent";
import { ProfileTabs } from "../ProfileTabs/ProfileTabs";

const MakeUp: FC = () => {
  return (
    <Container className="py-50 px-12 lg:px-24 lg:py-100">
      <ProfileTabs />
      <MakeUpContent />
    </Container>
  );
};

export { MakeUp };
