import React, { FC, TextareaHTMLAttributes } from "react";
import cn from "classnames";
import { Text } from "../Text/Text";

type TextAreaType = "default";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  topLabel?: string;
  textAreaType?: TextAreaType;
  leftLabel?: string;
  withTopOffset?: boolean;
  withLabelBottomOffset?: boolean;
  withBottomOffset?: boolean;
}

const TextArea: FC<TextAreaProps> = ({
  textAreaType = "default",
  leftLabel,
  withTopOffset,
  topLabel,
  className,
  withLabelBottomOffset,
  withBottomOffset,
  ...rest
}) => {
  return (
    <div
      className={cn({
        "mt-3": withTopOffset,
        "mb-7": withBottomOffset,
      })}
    >
      {leftLabel && (
        <Text
          textVariant="dark-label"
          className={cn({
            "mb-3": withLabelBottomOffset,
          })}
        >
          {leftLabel}
        </Text>
      )}
      <textarea
        {...rest}
        className={cn(
          "w-full outline-0 outline-none block",
          {
            "h-[93px] bg-white border border-black py-3 px-3 placeholder:text-black leading-[30px]":
              textAreaType === "default",
          },

          className
        )}
      />
    </div>
  );
};

export { TextArea };
