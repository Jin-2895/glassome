import React, { FC } from "react";
import cn from "classnames";
import { useRouter } from "next/router";
import { DetailedTutorialCard } from "../DetailedTutorialCard/DetailedTutorialCard";
import { useGetSearchedProducts } from "../../../hooks";

const DetailedTutorialList: FC = () => {
  const { query } = useRouter();
  const { tutorials } = useGetSearchedProducts(
    query.fullProductName as string,
    query.lookingFor as string
  );

  return (
    <div className="mx-auto mt-7 sm:w-2/3 md:mt-0">
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 items-center gap-x-px gap-y-px"
        )}
      >
        {tutorials.map((detailedTutorial) => (
          <DetailedTutorialCard
            key={detailedTutorial.id}
            detailedTutorial={detailedTutorial}
          />
        ))}
      </div>
    </div>
  );
};

export { DetailedTutorialList };
