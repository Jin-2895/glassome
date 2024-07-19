import React, { ReactNode, useRef, useState } from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import cn from "classnames";
import { Divider } from "../Divider/Divider";
import { Text } from "../Text/Text";
import { useOutsideClick } from "../../hooks";
import { Loader } from "../Loader/Loader";

type DropDownType = "default" | "trigger-by-button";

interface DropDownProps<T> {
  dropdownItems: T[];
  renderItem: (item: T) => ReactNode;
  title?: string;
  bottomLabel?: string;
  selectedItemColor?: string;
  wrapperClassName?: string;
  listClassName?: string;
  isError?: boolean;
  error?: string;
  isShownFromOutside?: boolean;
  dropDownType?: DropDownType;
  isLoading?: boolean;
  disabled?: boolean;
}

const DropDown = <T,>({
  dropdownItems,
  renderItem,
  title,
  bottomLabel,
  selectedItemColor,
  wrapperClassName,
  error,
  isError,
  isShownFromOutside,
  listClassName,
  dropDownType,
  isLoading,
  disabled,
}: DropDownProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const isDisabledColor = disabled ? "grey" : "black";
  const dropDownRef = useRef<HTMLDivElement>(null);

  const toggleDropDown = () => {
    setIsVisible((prev) => !prev);
  };

  const closeDropDown = () => {
    setIsVisible(false);
  };

  useOutsideClick(dropDownRef, closeDropDown, isVisible);

  if (dropDownType === "trigger-by-button") {
    return (
      <div>
        {isShownFromOutside && (
          <ul
            className={cn(
              "py-7 px-2.5 items-end border border-black z-[999] bg-white overflow-y-auto max-h-80",
              listClassName
            )}
          >
            {dropdownItems.map(renderItem)}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div
      ref={dropDownRef}
      className={cn("relative bg-white items-center", wrapperClassName)}
    >
      <button
        type="button"
        disabled={disabled}
        className={cn(
          "flex items-center h-12 py-2.5 justify-between relative w-full",
          { "duration-300 hover:opacity-50 cursor-pointer": !disabled },
          { "cursor-not-allowed": disabled }
        )}
        onClick={toggleDropDown}
        onKeyDown={toggleDropDown}
      >
        {isLoading ? (
          <Loader size="xs" isLoading={isLoading} color="black" />
        ) : (
          <Text
            as="p"
            textVariant="selected-item"
            className={cn("mb-2", {
              "text-gray-500": disabled,
              selectedItemColor: !disabled,
            })}
          >
            {title}
          </Text>
        )}
        {isVisible ? (
          <AiFillCaretUp className="w-3 h-3 sm:w-5 sm:h-5" />
        ) : (
          <AiFillCaretDown
            color={isDisabledColor}
            className="w-3 h-3 sm:w-5 sm:h-5"
          />
        )}
        <Divider className="absolute h-px bottom-0" />
      </button>
      <div className="flex flex-row justify-end">
        {bottomLabel && (
          <Text
            textVariant="libre-italic"
            className={cn(
              "mt-3",
              disabled ? "text-secondary-grey" : "text-black"
            )}
          >
            {bottomLabel}
          </Text>
        )}
      </div>
      {isError && (
        <Text textVariant="error" className="absolute -bottom-7 inset-x-0">
          {error}
        </Text>
      )}
      {isVisible && (
        <ul
          className={cn(
            "py-7 px-2.5 items-end border border-black absolute right-0 w-full md:w-3/4 z-[999] bg-white overflow-y-auto max-h-80",
            bottomLabel ? "mt-1.5" : "mt-2"
          )}
        >
          {dropdownItems.map(renderItem)}
        </ul>
      )}
    </div>
  );
};

export { DropDown };
