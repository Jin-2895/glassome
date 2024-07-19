import { FC } from "react";
import { Text } from "../../../ui";

const Recommendations: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-11 sm:mt-[89px]">
      <Text as="p" textVariant="libre-normal" className="text-center">
        Don’t see a product listed?
      </Text>
      <Text as="p" textVariant="libre-normal" className="text-center">
        Email us and we’ll respond with recommendations.
      </Text>
      <Text
        as="a"
        textVariant="libre-normal"
        href="mailto:hello@glossa.me"
        className="mt-3 sm:mt-7"
      >
        hello@glossa.me
      </Text>
    </div>
  );
};

export { Recommendations };
