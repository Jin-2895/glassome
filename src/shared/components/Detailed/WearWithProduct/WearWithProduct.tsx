import React, { FC } from "react";
import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import qs from "querystring";
import { HeaderContainer, Text } from "../../../ui";
import { useCategories, useSearchProductImage } from "../../../hooks";
import { TutorialHeading } from "../TutorialHeading/TutorialHeading";

interface WearWithProductProps {
  withCategories?: boolean;
  withTutorials?: boolean;
}

const WearWithProduct: FC<WearWithProductProps> = ({
  withCategories = true,
  withTutorials = false,
}) => {
  const { query } = useRouter();

  const { searchedProducts } = useSearchProductImage(
    query.toWearWith as string,
    query.fullProductName as string
  );

  const { categories } = useCategories();

  const fullProductName = qs.stringify({
    fullProductName: query.fullProductName,
  });

  return (
    <HeaderContainer className="px-6 py-8 lg:px-14 lg:pt-24">
      <div className="mb-20">
        {searchedProducts.map((product) => (
          <Link
            key={product.sys.id}
            href={product.fields.product_url || ""}
            target="_blank"
          >
            <div className="flex flex-col items-center justify-center">
              {!!product.fields.img_url && (
                <Image
                  src={product.fields.img_url}
                  alt="Picture of the author"
                  width={100}
                  height={122}
                />
              )}
              <Text as="p" textVariant="searched-product" className="mt-2">
                {product.fields.full_product}
              </Text>
            </div>
          </Link>
        ))}
      </div>

      <Text
        as="h1"
        textVariant="libre-xl"
        className="mb-8 md:mb-16 uppercase text-center"
      >
        can be paired with
      </Text>

      {withCategories && (
        <ul className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-4">
          {categories.map((category) => (
            <li key={category.sys.id}>
              <Link
                className={cn(
                  "block py-2 px-3 sm:py-4 sm:px-6 border border-black rounded-[10px] uppercase cursor-pointer",
                  {
                    "bg-black text-white": query?.lookingFor?.includes(
                      category.fields.name || ""
                    ),
                  }
                )}
                href={`/detailed?lookingFor=${category.fields.name}&toWearWith=${query.toWearWith}&${fullProductName}`}
                shallow
              >
                <Text textVariant="libre-normal">{category.fields.name}</Text>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {withTutorials && <TutorialHeading />}
    </HeaderContainer>
  );
};

export { WearWithProduct };
