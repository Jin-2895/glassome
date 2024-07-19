import React, { FC, useCallback, useState } from "react";

interface ToggleChildProps {
  isToggled: boolean;
  handleToggle: () => void;
}

interface ToggleProps {
  children: (props: ToggleChildProps) => React.ReactElement;
}

const ToggleState: FC<ToggleProps> = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = useCallback(() => {
    setIsToggled((prevState) => !prevState);
  }, []);

  return children({
    isToggled,
    handleToggle,
  });
};

export { ToggleState };
