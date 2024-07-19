import { NextPage } from "next";
import { Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import qs from "querystring";
import { Range } from "react-input-range";
import { event } from "nextjs-google-analytics";
import { Button, Container, Layout, Text } from "../../shared/ui";
import { WearWithProduct, SortFilter } from "../../shared/components/Detailed";
import { useGetDetailedProducts, useProductFilters } from "../../shared/hooks";
import { FormikFiltersValues } from "../../shared/components/Detailed/models";
import { additionalCategoryMappings } from "../../shared/helpers";
import {
  GoogleAnalyticsEventNames,
  SearchedProduct,
} from "../../shared/models";
import { MainContent } from "../../shared/components/Detailed/MainContent/MainContent";
import { NavigationMenu } from "../../shared/components/Common";

const parseCurrency = (value = "") => parseInt(value.slice(1), 10);

const filterByPrice = (data: SearchedProduct[], range: Range) =>
  data.filter(
    (d) =>
      parseCurrency(d.price) >= range.min && parseCurrency(d.price) <= range.max
  );

const sortByOrder = (data: SearchedProduct[], order: string | null) => {
  if (order === "Low to High") {
    return [...data].sort(
      (a, b) => parseCurrency(a.price) - parseCurrency(b.price)
    );
  }

  if (order === "High to low") {
    return [...data].sort(
      (a, b) => parseCurrency(b.price) - parseCurrency(a.price)
    );
  }

  if (order === "Under $50") {
    return data.filter((d) => parseCurrency(d.price) <= 50);
  }

  if (order === "A-Z") {
    return [...data].sort((a, b) =>
      (a.full_product || "").localeCompare(b.full_product || "")
    );
  }

  if (order === "Z-A") {
    return [...data].sort((a, b) =>
      (b.full_product || "").localeCompare(a.full_product || "")
    );
  }
  return data;
};

const FullDetails: NextPage = () => {
  const { query, replace, back } = useRouter();
  const { preferences, spfs, alphabetFilters, priceFilters } =
    useProductFilters();

  const { detailedProducts, brands } = useGetDetailedProducts({
    productFullName: query.fullProductName as string,
    category: additionalCategoryMappings[query.lookingFor as string],
    preference: query.preference as string,
    spf: query.spf as string,
    brand: query.brand as string,
  });

  const products = useMemo(() => {
    const filteredByPrice = filterByPrice(detailedProducts, {
      min: parseInt((query.minPrice as string) || "0", 10),
      max: parseInt((query.maxPrice as string) || "150", 10),
    });

    const sortedByOrder = sortByOrder(filteredByPrice, query.order as string);

    return sortedByOrder;
  }, [detailedProducts, query]);

  const formik = useFormik<FormikFiltersValues>({
    initialValues: {
      preference: "",
      spf: "",
      priceRange: {
        min: 0,
        max: 150,
      },
      order: "",
      brand: "",
    },
    onSubmit: (values) => {
      const queryParams = qs.stringify({
        fullProductName: query.fullProductName,
        lookingFor: query.lookingFor,
        preference: values.preference,
        spf: values.spf,
        minPrice: values.priceRange.min,
        maxPrice: values.priceRange.max,
        order: values.order,
        brand: values.brand,
        toWearWith: query.toWearWith,
      });

      replace(`/full-details?${queryParams}`);
    },
  });

  useEffect(() => {
    formik.setFieldValue("preference", query.preference);
    event(GoogleAnalyticsEventNames.RESULTS_PAGE_FILTERS, {
      label: `Filter by: ${query.preference}`,
    });
  }, [query.preference]);

  useEffect(() => {
    formik.setFieldValue("spf", query.spf);
    event(GoogleAnalyticsEventNames.RESULTS_PAGE_FILTERS, {
      label: `Filter by: ${query.spf}`,
    });
  }, [query.spf]);

  useEffect(() => {
    formik.setFieldValue("brand", query.brand);
    event(GoogleAnalyticsEventNames.RESULTS_PAGE_FILTERS, {
      label: `Filter by: ${query.brand}`,
    });
  }, [query.brand]);

  useEffect(() => {
    formik.setFieldValue("priceRange", {
      min: Number(query.minPrice as string) || 0,
      max: Number(query.maxPrice as string) || 150,
    });
    event(GoogleAnalyticsEventNames.RESULTS_PAGE_FILTERS, {
      label: `Filter by: ${query.minPrice} ${query.maxPrice}`,
    });
  }, [query.minPrice, query.maxPrice]);

  useEffect(() => {
    formik.setFieldValue("order", query.order);
    event(GoogleAnalyticsEventNames.RESULTS_PAGE_FILTERS, {
      label: `Sort by: ${query.order}`,
    });
  }, [query.order]);

  return (
    <Layout header={<NavigationMenu />}>
      <FormikProvider value={formik}>
        <Form>
          <WearWithProduct withCategories={false} />

          <SortFilter
            category={query.lookingFor?.toString().toUpperCase() as string}
            alphabetItems={alphabetFilters}
            priceItems={priceFilters}
          />

          <MainContent
            detailedProducts={products}
            brands={brands}
            preferences={preferences}
            spfs={spfs}
          />

          <Container className="flex flex-row items-center justify-center md:justify-start sm:px-[87px] sm:py-0">
            <Button
              className="mt-10 mb-7"
              type="button"
              buttonType="link"
              onClick={() => back()}
            >
              <Text
                textVariant="results"
                className="uppercase block text-center sm:text-left"
              >
                back to recommendations
              </Text>
            </Button>
          </Container>
        </Form>
      </FormikProvider>
    </Layout>
  );
};

export default FullDetails;
