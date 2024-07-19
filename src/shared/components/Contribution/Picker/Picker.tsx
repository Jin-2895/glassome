import React, { FC } from "react";
import cn from "classnames";
import { Button, Text } from "../../../ui";

interface PickerProps {
  items?: [string, string, string];
  activeIndex: string;
  isError?: boolean;
  error?: string;
  onChange: (seasonValue: string) => void;
  withBottomOffset?: boolean;
  leftLabel?: string;
  rightLabel?: string;
}

const seasons = ["Summer", "Winter", "All Year"];

const Picker: FC<PickerProps> = ({
  activeIndex,
  items = seasons,
  onChange,
  leftLabel,
  rightLabel,
  withBottomOffset,
  error,
  isError,
}) => {
  return (
    <div
      className={cn("flex flex-col rounded-lg", {
        "mb-7": withBottomOffset,
      })}
    >
      <div className="flex flex-row justify-between mb-4">
        <Text textVariant="dark-label">{leftLabel}</Text>
        <Text textVariant="gray-label">{rightLabel}</Text>
      </div>
      <div className={cn("flex flex-row border border-slate-200 rounded-lg")}>
        {items.map((season, index) => (
          <Button
            key={season}
            buttonType="feedback-picker"
            className={cn("relative", {
              "bg-neutral-900": activeIndex === season,
              "rounded-bl-lg rounded-tl-lg": index === 0,
              "rounded-br-lg rounded-tr-lg": index === 2,
            })}
            onClick={() => onChange(season)}
          >
            {index === 1 && (
              <div className="w-[1px] h-[10px] left-1 bg-fourth-grey absolute" />
            )}
            <Text
              textVariant="libre-sm"
              className={cn({
                "text-primary-white": activeIndex === season,
                "text-black": activeIndex !== season,
              })}
            >
              {season}
            </Text>
            {index === 1 && (
              <div className="w-[1px] h-[10px] right-1 bg-fourth-grey absolute" />
            )}
          </Button>
        ))}
      </div>
      {isError && <Text textVariant="error">{error}</Text>}
    </div>
  );
};

export { Picker };
