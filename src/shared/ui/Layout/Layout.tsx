import React, { FC, PropsWithChildren, ReactNode } from "react";
import { Seo } from "../Seo/Seo";

interface LayoutProps {
  header?: ReactNode;
  footer?: ReactNode;
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  footer,
  header,
}) => {
  return (
    <>
      <Seo />
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
};

export { Layout };
