// This file is used for generating typescript types for contentful models, all variables are taken from env.local file
const contentfulManagement = require("contentful-management");

module.exports = () => {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: "CONTENTFUL_ACCESS_TOKEN",
  });

  return contentfulClient
    .getSpace("CONTENTFUL_SPACE_ID")
    .then((space) => space.getEnvironment("CONTENTFUL_ENVIRONMENT"));
};
