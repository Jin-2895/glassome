import React, { FC, InputHTMLAttributes } from "react";
import cn from "classnames";
import { Text } from "../Text/Text";

type CheckBoxTextType = "checkbox" | "small-checkbox";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  checkBoxTextType?: CheckBoxTextType;
}

const CheckBox: FC<CheckBoxProps> = ({
  id,
  name,
  checked,
  checkBoxTextType = "checkbox",
  ...rest
}) => {
  return (
    <Text as="label" htmlFor={id} className="flex items-center cursor-pointer">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          className={cn(
            "w-2 h-2 bg-transparent border border-black focus:ring-offset-0 focus:ring-0 outline-none cursor-pointer checked:bg-black appearance-none"
          )}
          {...rest}
        />
      </div>
      <Text textVariant={checkBoxTextType}>{name}</Text>
    </Text>
  );
};

export { CheckBox };
