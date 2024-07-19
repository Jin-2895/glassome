import React, { FC } from "react";
import { ColorRing } from "react-loader-spinner";

type LoaderSize = "xs" | "sm" | "md" | "heart";

interface LoaderProps {
  isLoading: boolean;
  size?: LoaderSize;
  color?: string;
}

const loaderWidth = {
  xs: "25",
  heart: "30",
  sm: "55",
  md: "96",
};

const loaderHeight = {
  xs: "25",
  heart: "30",
  sm: "25",
  md: "96",
};

type ColorsType = [string, string, string, string, string];

const Loader: FC<LoaderProps> = ({ isLoading, size = "xs", color }) => {
  return (
    <ColorRing
      visible={isLoading}
      height={loaderHeight[size]}
      width={loaderWidth[size]}
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={
        color
          ? ([...Array(5).fill(color)] as ColorsType)
          : ["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]
      }
    />
  );
};

export { Loader };
