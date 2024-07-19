/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import qs from "querystring";
import { useGetSearchedProducts } from "../../../hooks";
import {
  Container,
  Divider,
  EmptyState,
  ImageWithError,
  Loader,
  Text,
} from "../../../ui";
import { Tutorials } from "../Tutorials/Tutorials";
import { formatCommaDelimiter } from "../../../helpers";

const LookingForProducts: FC = () => {
  const { query } = useRouter();
  const { isLoading, categorizedProducts, tutorials } = useGetSearchedProducts(
    query.fullProductName as string,
    query.lookingFor as string
  );

  const fullProductName = qs.stringify({
    fullProductName: query.fullProductName,
  });

  const emptyState = !isLoading && !categorizedProducts.length;

  return isLoading ? (
    <Container className="flex justify-center">
      <Loader size="md" isLoading color="black" />
    </Container>
  ) : (
    <>
      {emptyState && (
        <EmptyState>
          <Text textVariant="libre-xl" className="text-center">
            No Products were found
          </Text>
        </EmptyState>
      )}
      {categorizedProducts.map(({ category, items, total }) => (
        <div key={category}>
          <Container className="pb-[30px] sm:pb-[135px] w-full md:w-[750px] lg:w-[970px] xl:w-[1170px]">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-[76px]">
              <Text as="h2" textVariant="libre-xl">
                {category.toString().toUpperCase()}
              </Text>

              <Text textVariant="results">
                {total} {total > 1 ? "Results" : "Result"}
              </Text>
            </div>
            <ul>
              {items.map((item) => (
                <li
                  key={item.full_product}
                  className="border-b border-black last:border-none"
                >
                  <Link
                    className="flex flex-col md:flex-row items-center md:justify-between py-12 gap-x-4"
                    href={item.product_url || ""}
                    target="_blank"
                  >
                    {!!item.img_url && (
                      <div className="md:hidden relative w-[140px] h-[140px] mb-5">
                        <ImageWithError
                          src={item.img_url}
                          fill
                          placeholder="blur"
                          alt={item.full_product || ""}
                          blurDataURL={`/_next/image?url=${item.img_url}&w=16&q=1`}
                        />
                      </div>
                    )}

                    <div className="flex flex-col text-center md:text-left">
                      <Text as="p" textVariant="paired-p">
                        {item.brand}
                      </Text>
                      <Text
                        as="p"
                        textVariant="paired-p"
                        className="text-third-grey tracking-wider"
                      >
                        {item.full_product}
                      </Text>
                      <Text
                        as="p"
                        textVariant="paired-p"
                        className="text-third-grey tracking-wider"
                      >
                        {formatCommaDelimiter(item.price)}
                      </Text>
                    </div>

                    <div className="hidden md:block relative w-[140px] h-[140px]">
                      {item.img_url && (
                        <ImageWithError
                          src={item.img_url}
                          fill
                          placeholder="blur"
                          alt={item.full_product || ""}
                          blurDataURL={`/_next/image?url=${item.img_url}&w=16&q=1`}
                        />
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {total >= 3 && (
              <div className="mt-[70px]">
                <Link
                  className="font-dmSans font-medium text-third-grey underline"
                  href={`/full-details?lookingFor=${category}&toWearWith=${query.toWearWith}&${fullProductName}`}
                >
                  VIEW ALL
                </Link>
              </div>
            )}
          </Container>
          <Divider />

          <Tutorials
            tutorials={tutorials}
            isLoading={isLoading}
            category={category}
            toWearWith={query.toWearWith as string}
            fullProductName={fullProductName}
          />
        </div>
      ))}
    </>
  );
};

export { LookingForProducts };
