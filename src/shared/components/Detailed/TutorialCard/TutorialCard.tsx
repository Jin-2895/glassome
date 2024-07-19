import React, { FC } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import { FaInstagramSquare } from "react-icons/fa";
import Link from "next/link";
import { Tutorial } from "../models";

interface TutorialCardProps {
  tutorial: Tutorial;
}

const TutorialCard: FC<TutorialCardProps> = ({ tutorial }) => {
  return (
    <div className="sm:w-[400px] md:w-[500px] lg:w-[452px] flex flex-col cursor-pointer relative mx-auto">
      <div className="sm:w-[400px] md:w-[500px] lg:w-[452px]">
        <InstagramEmbed url={tutorial.link} height={420} />
      </div>

      <div className="flex flex-row justify-between items-center mt-2">
        <div className="flex flex-row items-center px-2">
          <Link href={tutorial.link} target="_blank">
            @
          </Link>

          <Link href={tutorial.link} target="_blank">
            {tutorial.creator}
          </Link>
        </div>
        <Link href={tutorial.link} target="_blank">
          <FaInstagramSquare className="w-[30px] h-[30px]" />
        </Link>
      </div>
    </div>
  );
};

export { TutorialCard };
