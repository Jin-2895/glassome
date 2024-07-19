import React, { FC } from "react";
import InputRange, {
  InputRangeProps,
  Range as RangeType,
} from "react-input-range";

import cn from "classnames";

interface RangeProps extends InputRangeProps {
  customClassName?: string;
}

function isRange(value: number | RangeType): value is RangeType {
  return (value as RangeType).max !== undefined;
}

const Range: FC<RangeProps> = ({
  maxValue = 150,
  minValue = 0,
  value,
  customClassName,
  ...rest
}) => {
  return (
    <div className={cn("relative", customClassName)}>
      <div className="flex flex-row items-center justify-center mb-3">
        <span className="text-sm font-dmSans font-normal not-italic text-black mr-1 inline-block items-center justify-center ">
          {isRange(value) ? `${"$"}${value.min}` : value}
        </span>
        <span className="text-black">-</span>
        <span className="text-sm font-dmSans font-normal not-italic text-black ml-1 inline-block">
          {isRange(value) ? `${"$"}${value.max}` : value}
        </span>
      </div>
      <InputRange
        value={value}
        maxValue={maxValue}
        minValue={minValue}
        {...rest}
        classNames={{
          activeTrack: "relative bg-black border cursor-pointer h-1.5",
          disabledInputRange: "",
          inputRange: "h-4 relative w-full",
          labelContainer: "hidden",
          maxLabel: "none",
          minLabel: "none",
          slider: cn(
            "appearance-none bg-black border-solid absolute block rounded-full w-4 h-4 -top-2.5 -right-px",
            "active:scale-125",
            "transition-all"
          ),
          sliderContainer: "",
          track: "bg-secondary-grey cursor-pointer h-1 block",
          valueLabel: "",
        }}
      />
      <span className="absolute left-0 text-base font-dmSans text-secondary-grey">{`${"$"}${minValue}`}</span>
      <span className="absolute right-1 text-base font-dmSans text-secondary-grey">{`${"$"}${maxValue}$`}</span>
    </div>
  );
};

export { Range };
