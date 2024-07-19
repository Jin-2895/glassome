import React, { FC, PropsWithChildren } from "react";
import cn from "classnames";

interface ContainerProps {
  className?: string;
}

const Container: FC<PropsWithChildren<ContainerProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "max-w-screen-2xl my-0 mx-auto py-[50px] sm:py-[100px] px-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export { Container };
