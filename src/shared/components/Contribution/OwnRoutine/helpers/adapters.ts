import { objectKeys } from "../../../../helpers";
import { UserContributionData } from "../../../../models";
import { contributionMappings } from "../constants";

export const adaptContributionValues = (values: UserContributionData) => {
  const valuesKeys = objectKeys(values);

  return valuesKeys.reduce((acc, key) => {
    return { ...acc, [contributionMappings[key]]: values[key] || "" };
  }, {} as { [key: string]: string });
};
