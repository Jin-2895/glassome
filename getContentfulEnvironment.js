// eslint-disable-next-line @typescript-eslint/no-var-requires
const contentfulManagement = require("contentful-management");

module.exports = () => {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: "CFPAT-u7rP56hMmCn9C7G_OqW_mxNLa9DPYcal2-HtT5ciFuY",
  });
  return contentfulClient
    .getSpace("8rk2t5ts3v7t")
    .then((space) => space.getEnvironment("master"));
};
