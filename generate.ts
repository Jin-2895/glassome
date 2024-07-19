export const product = {
  category: "",
  full_product: "",
  tutorials: 3,
  brand: "",
  product: "",
  shade: "",
  shade_description: "",
  skintone: "",
  skintone_original: "",
  undertone: "",
  undertone_original: "",
  price: "$22.00",
  product_url: "",
  img_url: "",
  cruelty_free: "",
  paraben_free: "",
  vegan: "",
  gluten_free: "",
  oil_free: "",
  talc_free: "",
  clean: "",
  bipoc_founded: "",
  spf: "",
};

export type ProductWithId = Omit<
  typeof product,
  | "shade"
  | "spf"
  | "talc_free"
  | "undertone"
  | "undertone_original"
  | "skintone"
  | "skintone_original"
  | "oil_free"
> & {
  shade: string | number;
  spf?: string | number;
  talc_free?: string;
  undertone?: string;
  undertone_original?: string;
  skintone?: string;
  skintone_original?: string;
  oil_free?: string;
};

export const data: ProductWithId[] = [];

const makeBoolean = (value?: string) => {
  return value === "TRUE";
};

const makeSPF = (value: string | number) => {
  if (typeof value === "string" && value === "") {
    return 0;
  }

  if (typeof value === "string" && value === "50+") {
    return 50;
  }

  return value;
};

export const formatProductJson = (products: ProductWithId[]) => {
  const productsWithId = products.map((product) => ({
    brand: product?.brand || "",
    category: product?.category || "",
    full_product: product?.full_product || "",
    img_url: product?.img_url || "",
    price: product?.price || "",
    product: product?.product || "",
    product_url: product.product_url || "",
    shade_description: product?.shade_description || "",
    skintone: product?.skintone || "",
    skintone_original: product?.skintone_original || "",
    tutorials: product?.tutorials || 0,
    undertone: product?.undertone || "",
    undertone_original: product?.undertone_original || "",
    shade: product.shade ? String(product.shade) : "",
    cruelty_free: product?.cruelty_free
      ? makeBoolean(product.cruelty_free)
      : false,
    paraben_free: product?.paraben_free
      ? makeBoolean(product.paraben_free)
      : false,
    vegan: product?.vegan ? makeBoolean(product.vegan) : false,
    gluten_free: product?.gluten_free
      ? makeBoolean(product.gluten_free)
      : false,
    oil_free: product?.oil_free ? makeBoolean(product.oil_free) : false,
    clean: product?.clean ? makeBoolean(product.clean) : false,
    bipoc_founded: product?.bipoc_founded
      ? makeBoolean(product.bipoc_founded)
      : false,
    spf: product.spf ? makeSPF(product.spf) : 0,
    talc_free: product?.talc_free ? makeBoolean(product?.talc_free) : false,
  }));

  const resultProducts = productsWithId.reduce((acc: any, product: any) => {
    const productKeys = Object.keys(product);
    const fields = productKeys.reduce((acc, key) => {
      return {
        ...acc,
        [key]: {
          "en-US": product[key],
        },
      };
    }, {});
    return [
      ...acc,
      {
        sys: {
          contentType: {
            sys: {
              type: "Link",
              linkType: "ContentType",
              id: "product",
            },
          },
        },
        fields: {
          ...fields,
        },
      },
    ];
  }, [] as ProductWithId[]);
  const resultJson = {
    entries: [...resultProducts],
  };
  return resultJson;
};

export const recommendationProductExample = {
  link: "https://www.instagram.com/p/CpKorV_NCUh/",
  creator: "charlottetilbury",
  pro: "TRUE",
  celebrity: "Aubrey Plaza",
  post: "",
  skintone: "light medium",
  skintone_original: "fair medium",
  undertone: "neutral",
  undertone_original: "neutral",
  foundation_1: "charlotte tilbury beautiful skin foundation 5 neutral",
  foundation_2: "",
  foundation_3: "",
  foundation_4: "",
  adjuster_1: "",
  adjuster_2: "",
  concealer_1:
    "charlotte tilbury beautiful skin medium to full coverage radiant concealer with hyaluronic acid 4.5",
  concealer_2: "",
  concealer_3: "",
  concealer_4: "",
  concealer_5: "",
  blush_1: "charlotte tilbury matte beauty blush wands dream pop",
  blush_2: "",
  blush_3: "",
  blush_4: "",
  bronzercontour_1: "charlotte tilbury airbrush matte bronzer fair",
  bronzercontour_2: "charlotte tilbury hollywood contour wand light/medium",
  bronzercontour_3: "",
  bronzercontour_4: "",
  bronzercontour_5: "",
  powder_1: "charlotte tilbury airbrush flawless finish setting powder 1 fair",
  powder_2: "",
  powder_3: "",
  powder_4: "",
  powder_5: "",
  powder_6: "",
  highlighter_1:
    "charlotte tilbury hollywood glow glide face architect highlighter champagne glow",
  highlighter_2: "",
  highlighter_3: "",
  lipliner_1: "charlotte tilbury lip cheat lip liner pillow talk",
  lipliner_2: "",
  lipliner_3: "",
  lipstick_1: "charlotte tilbury k.i.s.s.i.n.g lipstick runway royalty",
  lipstick_2: "",
  lipstick_3: "",
  lipstick_4: "",
  lipgloss_1: "",
  lipgloss_2: "",
  lipgloss_3: "",
};

type RecommendationProduct = typeof recommendationProductExample;

export const formatRecommendationJson = (products: RecommendationProduct[]) => {
  const productsWithId = products.map((product) => ({
    adjuster_1: product.adjuster_1 || "",
    adjuster_2: product.adjuster_2 || "",
    blush_1: product.blush_1 || "",
    blush_2: product.blush_2 || "",
    blush_3: product.blush_3 || "",
    blush_4: product.blush_4 || "",
    bronzercontour_1: product.bronzercontour_1 || "",
    bronzercontour_2: product.bronzercontour_2 || "",
    bronzercontour_3: product.bronzercontour_3 || "",
    bronzercontour_4: product.bronzercontour_4 || "",
    bronzercontour_5: product.bronzercontour_5 || "",
    celebrity: product.celebrity || "",
    concealer_1: product.concealer_1 || "",
    concealer_2: product.concealer_2 || "",
    concealer_3: product.concealer_3 || "",
    concealer_4: product.concealer_4 || "",
    concealer_5: product.concealer_5 || "",
    creator: product.creator || "",
    foundation_1: product.foundation_1 || "",
    foundation_2: product.foundation_2 || "",
    foundation_3: product.foundation_3 || "",
    foundation_4: product.foundation_4 || "",
    highlighter_1: product.highlighter_1 || "",
    highlighter_2: product.highlighter_2 || "",
    highlighter_3: product.highlighter_3 || "",
    link: product.link || "",
    lipgloss_1: product.lipgloss_1 || "",
    lipgloss_2: product.lipgloss_2 || "",
    lipgloss_3: product.lipgloss_3 || "",
    lipliner_1: product.lipliner_1 || "",
    lipliner_2: product.lipliner_2 || "",
    lipliner_3: product.lipliner_3 || "",
    lipstick_1: product.lipstick_1 || "",
    lipstick_2: product.lipstick_2 || "",
    lipstick_3: product.lipstick_3 || "",
    lipstick_4: product.lipstick_4 || "",
    post: product.post || "",
    powder_1: product.powder_1 || "",
    powder_2: product.powder_2 || "",
    powder_3: product.powder_3 || "",
    powder_4: product.powder_4 || "",
    powder_5: product.powder_5 || "",
    powder_6: product.powder_6 || "",
    pro: product.pro === "TRUE",
    skintone: product.skintone || "",
    skintone_original: product.skintone || "",
    undertone: product.undertone || "",
    undertone_original: product.undertone_original || "",
  }));

  const resultProducts = productsWithId.reduce((acc: any, product: any) => {
    const productKeys = Object.keys(product);
    const fields = productKeys.reduce((acc, key) => {
      return {
        ...acc,
        [key]: {
          "en-US": product[key],
        },
      };
    }, {});
    return [
      ...acc,
      {
        sys: {
          contentType: {
            sys: {
              type: "Link",
              linkType: "ContentType",
              id: "recommendation_product",
            },
          },
        },
        fields: {
          ...fields,
        },
      },
    ];
  }, [] as RecommendationProduct[]);
  const resultJson = {
    entries: [...resultProducts],
  };
  return resultJson;
};
