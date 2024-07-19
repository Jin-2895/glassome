import Link from "next/link";
import { FC } from "react";
import { FaInstagramSquare } from "react-icons/fa";
import { InstagramEmbed } from "react-social-media-embed";
import { Tutorial } from "../models";

interface DetailedTutorialCardProps {
  detailedTutorial: Tutorial;
}

const DetailedTutorialCard: FC<DetailedTutorialCardProps> = ({
  detailedTutorial,
}) => {
  const { creator, link } = detailedTutorial;

  return (
    <div className="relative flex flex-col border h-full  sm:p-[40px] shadow-grid">
      <div className="">
        <InstagramEmbed url={link} height={420} />
      </div>

      <div className="flex flex-row justify-between items-center mt-2">
        <div className="flex flex-row items-center px-2">
          <Link href={link} target="_blank">
            @
          </Link>

          <Link href={link} target="_blank">
            {creator}
          </Link>
        </div>
        <Link href={link} target="_blank">
          <FaInstagramSquare className="w-[30px] h-[30px]" />
        </Link>
      </div>
    </div>
  );
};

export { DetailedTutorialCard };
