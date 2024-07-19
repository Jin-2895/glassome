import React, { FC, PropsWithChildren, ReactNode } from "react";
import cn from "classnames";
import { AiOutlineClose } from "react-icons/ai";
import { Text } from "../Text/Text";
import { Divider } from "../Divider/Divider";

interface ComplexFilterProps {
  wrapperClassName?: string;
  exitIconClassName?: string;
  headingClassName?: string;
  onClose: () => void;
  headingTitle: string;
  isBottomDividerShown?: boolean;
  leftButton?: ReactNode;
  rightButton?: ReactNode;
}

const ComplexFilter: FC<PropsWithChildren<ComplexFilterProps>> = ({
  children,
  wrapperClassName,
  onClose,
  headingTitle,
  isBottomDividerShown = true,
  exitIconClassName,
  headingClassName,
  leftButton,
  rightButton,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col px-20 py-16 bg-primary-white border border-black z-10",
        wrapperClassName
      )}
    >
      <span
        className={cn(
          "absolute right-9 top-10 cursor-pointer",
          exitIconClassName
        )}
      >
        <AiOutlineClose fontSize={25} onClick={onClose} />
      </span>
      <div className={cn("", headingClassName)}>
        <Text as="h3">{headingTitle}</Text>
        {isBottomDividerShown && (
          <Divider className="bg-light-grey h-px mt-10" />
        )}
      </div>
      {children}
      <div className="flex flex-col sm:flex-row items-center justify-start mt-9">
        {leftButton}
        {rightButton}
      </div>
    </div>
  );
};

export { ComplexFilter };
