import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import cn from "classnames";
import { Loader } from "../Loader/Loader";

type ButtonType =
  | "filter"
  | "sort"
  | "rounded"
  | "default"
  | "link"
  | "feedback-picker"
  | "action";

type LoaderSize = "xs" | "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDarkBackground?: boolean;
  isLoading?: boolean;
  buttonType?: ButtonType;
  rightIcon?: ReactNode;
  loaderSize?: LoaderSize;
  loaderColor?: string;
}

export type Ref = HTMLButtonElement;

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    isDarkBackground = false,
    className,
    children,
    isLoading,
    buttonType = "default",
    loaderSize = "sm",
    loaderColor = "white",
    rightIcon,
    ...rest
  } = props;

  return (
    <button
      type="button"
      {...rest}
      className={cn(
        {
          "py-1.5 px-5 border-black border border-solid duration-300 hover:opacity-60":
            buttonType === "default",
        },
        { "bg-black": isDarkBackground },
        rightIcon ? "flex items-center justify-between" : "",
        {
          "py-3 px-3 rounded-xl border border-grey-200 bg-primary-white w-[131px]":
            buttonType === "filter",
        },
        {
          "border border-grey-200  py-3.5 px-7 rounded-xl hover:bg-grey-100":
            buttonType === "sort",
        },
        {
          "py-1.5 px-5 border-black border border-solid rounded-lg duration-300 hover:opacity-60":
            buttonType === "rounded",
        },
        { "": buttonType === "link" },
        {
          "w-full py-1 px-4 flex flex-row items-center justify-center bg-secondary-white duration-300 hover:opacity-60":
            buttonType === "feedback-picker",
        },
        {
          "border rounded-[30px] px-2 sm:px-4 py-1 min-h-[45px] bg-light-grey  duration-300 hover:opacity-60":
            buttonType === "action",
        },
        className
      )}
      ref={ref}
    >
      {isLoading ? (
        <div className="flex justify-center">
          <Loader isLoading={isLoading} color={loaderColor} size={loaderSize} />
        </div>
      ) : (
        children
      )}
      {!!rightIcon && rightIcon}
    </button>
  );
});

export { Button };
