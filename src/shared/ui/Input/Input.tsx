import cn from "classnames";
import React, { FC, InputHTMLAttributes } from "react";
import { Text } from "../Text/Text";

type InputType = "feedback" | "search" | "auth";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
  isError?: boolean;
  inputType?: InputType;
  leftLabel?: string;
  rightLabel?: string;
  withLabelBottomOffset?: boolean;
  withBottomOffset?: boolean;
}

const Input: FC<InputProps> = ({
  className,
  error,
  isError,
  inputType,
  leftLabel,
  rightLabel,
  withLabelBottomOffset,
  withBottomOffset,
  ...rest
}) => {
  return (
    <div
      className={cn("relative", {
        "mb-7": !!withBottomOffset,
      })}
    >
      <div
        className={cn(
          "w-full flex flex-row justify-between items-center mb-3",
          {
            "mb-3": withLabelBottomOffset,
          }
        )}
      >
        {leftLabel && <Text textVariant="dark-label">{leftLabel}</Text>}
        {rightLabel && <Text textVariant="gray-label">{rightLabel}</Text>}
      </div>
      <input
        {...rest}
        className={cn([
          "w-full outline-0 outline-none",
          "placeholder:text-third-grey",
          {
            "border-black border py-3 px-3 placeholder:text-black":
              inputType === "feedback",
          },
          {
            "w-[300px] sm:w-[427px] bg-white rounded-xl py-5 px-3 border-2 border-black":
              inputType === "auth",
          },
          { "border border-red-600": !!isError },
          className,
        ])}
      />
      {isError && (
        <Text textVariant="error" className="absolute -bottom-7 inset-x-0">
          {error}
        </Text>
      )}
    </div>
  );
};

export { Input };
