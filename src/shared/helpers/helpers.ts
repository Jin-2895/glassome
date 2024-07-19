/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable no-multi-assign */
import produce from "immer";

export const adaptStringArray = (
  index: number,
  data: string[],
  value: string
) =>
  produce(data, (draft) => {
    draft[index] = value;
  });

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const titleFormatter = (title = "") => {
  const excludeWords = ["of", "the"];

  return capitalizeFirstLetter(
    title.replace(/\b\w+\b/g, (m) =>
      excludeWords.includes(m) ? m : capitalizeFirstLetter(m)
    )
  );
};

export const replaceUnderscoreWithSlash = (str: string) => {
  return str.replace(/_/g, "/");
};

export const objectKeys = <Obj extends Object>(object: Obj): (keyof Obj)[] => {
  return Object.keys(object) as (keyof Obj)[];
};

export const uuid = () => {
  const chars = "0123456789abcdef".split("");

  const uuids = [];
  const rnd = Math.random;

  let r;

  uuids[8] = uuids[13] = uuids[18] = uuids[23] = "-";
  uuids[14] = "4";

  for (let i = 0; i < 36; i++) {
    if (!uuids[i]) {
      r = 0 | (rnd() * 16);

      uuids[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r & 0xf];
    }
  }

  return uuids.join("");
};

export const formatCommaDelimiter = (price?: string) => {
  if (!price) {
    return "";
  }

  return price.replace(",", ".");
};
