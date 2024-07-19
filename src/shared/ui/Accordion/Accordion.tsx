import React, { FC, PropsWithChildren, useState } from "react";
import { Collapse } from "react-collapse";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Divider } from "../Divider/Divider";
import { Text } from "../Text/Text";

interface AccordionProps {
  title: string;
}

const Accordion: FC<PropsWithChildren<AccordionProps>> = ({
  children,
  title,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleAccordion = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <>
      <button
        className="flex flex-row justify-between w-full items-center relative py-5"
        onClick={() => toggleAccordion()}
        type="button"
      >
        <Text as="h3" className="text-sm">
          {title}
        </Text>
        {isOpened ? <AiOutlineMinus /> : <AiOutlinePlus />}
      </button>
      <Collapse isOpened={isOpened}>{children}</Collapse>
      <Divider className="bg-light-grey h-px" />
    </>
  );
};

export { Accordion };
