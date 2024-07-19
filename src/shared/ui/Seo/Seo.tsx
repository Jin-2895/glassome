import React, { FC } from "react";
import { Helmet, HelmetProps } from "react-helmet";
import Favicon from "../../../assets/images/favicon.png";

interface SeoProps extends HelmetProps {
  lang?: string;
  title?: string;
}

const Seo: FC<SeoProps> = ({ lang = "en", title, ...rest }) => {
  const defaultTitle = title || "/glossa·me/";

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      defaultTitle={defaultTitle}
      meta={[
        {
          property: "og:description",
          content: "Your makeup search and recommendation engine",
        },
      ]}
      {...rest}
    >
      <link rel="shortcut icon" type="image/png" href={Favicon.src} />
      <link
        href="https://fonts.googleapis.com/css2?family=Spectral:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};

export { Seo };
