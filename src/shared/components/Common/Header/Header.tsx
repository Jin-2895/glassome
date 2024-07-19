import React, { FC } from "react";
import Image from "next/image";
import ProfileLogo from "../../../../assets/images/profile-image.png";

const Header: FC = () => {
  return (
    <header>
      <Image
        src={ProfileLogo}
        className="w-full"
        alt="Profile"
        placeholder="blur"
      />
    </header>
  );
};

export { Header };
