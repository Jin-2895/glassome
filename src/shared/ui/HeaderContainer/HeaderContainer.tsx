import React, { FC, PropsWithChildren } from "react";
import cn from "classnames";

interface HeaderContainerProps {
  className?: string;
}

const HeaderContainer: FC<PropsWithChildren<HeaderContainerProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn("max-w-screen-2xl my-0 mx-auto py-[50px] px-6", className)}
    >
      {children}
    </div>
  );
};

export { HeaderContainer };
