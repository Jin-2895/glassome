import React, { FC } from "react";
import cn from "classnames";

interface DividerProps {
  className?: string;
}

const Divider: FC<DividerProps> = ({ className }) => {
  return <div className={cn("w-full bg-black h-px", className)} />;
};

export { Divider };
