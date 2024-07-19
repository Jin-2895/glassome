import { FC } from "react";
import { UserContributionData } from "../../../models";
import { Divider, Text } from "../../../ui";

interface OwnContributionProps extends UserContributionData {
  withDivider?: boolean;
}

const OwnContribution: FC<OwnContributionProps> = ({
  blush,
  bronzerContour,
  colorAdjuster,
  concealer,
  powder,
  lipGloss,
  lipLiners,
  lipstick,
  foundationOther,
  foundationFirst,
  foundationFirstSeason,
  foundationSecond,
  foundationSecondSeason,
  foundationThird,
  foundationThirdSeason,
  foundationFourth,
  foundationFourthSeason,
  withDivider,
}) => {
  return (
    <div className="flex flex-col mt-6">
      <div className="mb-6">
        <div className="flex flex-col items-start sm:flex-row sm:items-center">
          <div className="flex flex-col min-w-[226px]">
            <Text textVariant="contribution-field" className="uppercase">
              foundation 1
            </Text>
            <Text textVariant="contribution-field" className="uppercase">
              foundation 1 season
            </Text>
          </div>

          <div className="flex flex-col sm:sm:ml-16">
            <Text as="p" textVariant="contribution-description">
              {foundationFirst}
            </Text>
            <Text as="p" textVariant="contribution-description">
              {foundationFirstSeason}
            </Text>
          </div>
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center mt-5">
          <div className="flex flex-col min-w-[226px]">
            <Text textVariant="contribution-field" className="uppercase">
              foundation 2
            </Text>
            <Text textVariant="contribution-field" className="uppercase">
              foundation 2 season
            </Text>
          </div>

          <div className="flex-flex-col sm:ml-16">
            <Text as="p" textVariant="contribution-description">
              {foundationSecond}
            </Text>
            <Text as="p" textVariant="contribution-description">
              {foundationSecondSeason}
            </Text>
          </div>
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center mt-5">
          <div className="flex flex-col min-w-[226px]">
            <Text textVariant="contribution-field" className="uppercase">
              foundation 3
            </Text>
            <Text textVariant="contribution-field" className="uppercase">
              foundation 3 season
            </Text>
          </div>

          <div className="flex flex-col items-center sm:ml-16">
            <Text as="p" textVariant="contribution-description">
              {foundationThird}
            </Text>
            <Text as="p" textVariant="contribution-description">
              {foundationThirdSeason}
            </Text>
          </div>
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center mt-5">
          <div className="flex flex-col min-w-[226px]">
            <Text textVariant="contribution-field" className="uppercase">
              foundation 4
            </Text>
            <Text textVariant="contribution-field" className="uppercase">
              foundation 4 season
            </Text>
          </div>

          <div className="flex-flex-col items-center sm:ml-16">
            <Text as="p" textVariant="contribution-description">
              {foundationFourth}
            </Text>
            <Text as="p" textVariant="contribution-description">
              {foundationFourthSeason}
            </Text>
          </div>
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center mt-5">
          <Text
            textVariant="contribution-field"
            className="uppercase min-w-[226px]"
          >
            Foundation (other)
          </Text>
          <Text
            as="p"
            textVariant="contribution-description"
            className="sm:ml-16"
          >
            {foundationOther}
          </Text>
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center mt-5">
          <Text
            textVariant="contribution-field"
            className="uppercase min-w-[226px]"
          >
            color adjuster
          </Text>
          <Text
            as="p"
            textVariant="contribution-description"
            className="sm:ml-16"
          >
            {colorAdjuster}
          </Text>
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center mt-5">
          <Text
            textVariant="contribution-field"
            className="uppercase min-w-[226px]"
          >
            concealer
          </Text>
          <Text
            as="p"
            textVariant="contribution-description"
            className="sm:ml-16"
          >
            {concealer}
          </Text>
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center mt-5">
          <Text
            textVariant="contribution-field"
            className="uppercase min-w-[226px]"
          >
            blush
          </Text>
          <Text
            as="p"
            textVariant="contribution-description"
            className="sm:ml-16"
          >
            {blush}
          </Text>
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center mt-5">
          <Text
            textVariant="contribution-field"
            className="uppercase min-w-[226px]"
          >
            bronzer/contour
          </Text>
          <Text
            as="p"
            textVariant="contribution-description"
            className="sm:ml-16"
          >
            {bronzerContour}
          </Text>
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center mt-5">
          <Text
            textVariant="contribution-field"
            className="uppercase min-w-[226px]"
          >
            powder
          </Text>
          <Text
            as="p"
            textVariant="contribution-description"
            className="sm:ml-16"
          >
            {powder}
          </Text>
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center mt-5">
          <Text
            textVariant="contribution-field"
            className="uppercase min-w-[226px]"
          >
            lipstick
          </Text>
          <Text
            as="p"
            textVariant="contribution-description"
            className="sm:ml-16"
          >
            {lipstick}
          </Text>
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center mt-5">
          <Text
            textVariant="contribution-field"
            className="uppercase min-w-[226px]"
          >
            lipliners
          </Text>
          <Text
            as="p"
            textVariant="contribution-description"
            className="sm:ml-16"
          >
            {lipLiners}
          </Text>
        </div>

        <div className="flex flex-col items-start sm:flex-row sm:items-center mt-5">
          <Text
            textVariant="contribution-field"
            className="uppercase min-w-[226px]"
          >
            lipgloss
          </Text>
          <Text
            as="p"
            textVariant="contribution-description"
            className="sm:ml-16"
          >
            {lipGloss}
          </Text>
        </div>
      </div>

      {withDivider && <Divider />}
    </div>
  );
};

export { OwnContribution };
