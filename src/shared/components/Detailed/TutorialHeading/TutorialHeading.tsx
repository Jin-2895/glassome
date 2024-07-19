import React, { FC } from "react";
import { Text } from "../../../ui";

const TutorialHeading: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Text textVariant="libre-xl" className="uppercase text-center">
        featured in these tutorials
      </Text>

      <Text className="mt-8 text-center" as="p">
        Many artists and creators have their own shops set up. Please support
        them by shopping directly
        <br />
        (links to their shops are often in their bios).
      </Text>
    </div>
  );
};

export { TutorialHeading };
