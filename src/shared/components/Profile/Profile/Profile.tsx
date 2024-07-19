import React, { FC } from "react";
import { Container } from "../../../ui";
import { OwnContributions } from "../OwnContributions/OwnContributions";
import { ProfileTabs } from "../ProfileTabs/ProfileTabs";

const Profile: FC = () => {
  return (
    <Container className="py-50 px-12 lg:px-24 lg:py-100">
      <div className="flex flex-col">
        <ProfileTabs />
        <OwnContributions />
      </div>
    </Container>
  );
};

export { Profile };
