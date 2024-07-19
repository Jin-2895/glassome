import React, { FC, PropsWithChildren } from "react";
import cn from "classnames";

interface EmptyStateProps {
  className?: string;
}

const EmptyState: FC<PropsWithChildren<EmptyStateProps>> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-row items-center justify-center", className)}>
      {children}
    </div>
  );
};

export { EmptyState };
