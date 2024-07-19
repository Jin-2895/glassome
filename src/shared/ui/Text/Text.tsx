import * as React from "react";
import cn from "classnames";

type TextVariants =
  | "libre"
  | "libre-sm"
  | "libre-xl"
  | "libre-2xl"
  | "libre-bold"
  | "libre-normal"
  | "libre-italic"
  | "results"
  | "lg-h"
  | "md-h"
  | "3xl-h"
  | "base-h"
  | "base-p"
  | "lg-p"
  | "xl-p"
  | "2xl-p"
  | "italic"
  | "lg-span"
  | "selected-item"
  | "checkbox"
  | "small-checkbox"
  | "error"
  | "purple-link"
  | "dark-link"
  | "dark-link-bold"
  | "searched-product"
  | "feedback-label"
  | "contribution-label"
  | "contribution-h"
  | "contribution-base-h"
  | "contribution-description"
  | "contribution-field"
  | "gray-label"
  | "filter"
  | "paired-p"
  | "grey-link"
  | "dark-label"
  | "profile-tab"
  | "action-button"
  | "favorite-brand"
  | "favorite-product"
  | "favorite-shade"
  | "favorite-price"
  | "header-menu-link"
  | "guide-banner";

type TextOwnProps<E extends React.ElementType = React.ElementType> = {
  children: React.ReactNode;
  as?: E;
  textVariant?: TextVariants;
};

type TextProps<E extends React.ElementType> = TextOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TextOwnProps>;

const defaultElement = "span";

function Text<E extends React.ElementType = typeof defaultElement>({
  children,
  as,
  className,
  textVariant,
  ...rest
}: TextProps<E>) {
  const Component = as || "span";

  return (
    <Component
      className={cn(
        "font-spectral",
        {
          "font-normal text-sm sm:text-md text-black":
            textVariant === "header-menu-link",
        },
        {
          "tracking-widest font-normal text-center text-sm":
            textVariant === "searched-product",
        },
        {
          "text-third-grey font-normal text-center text-xl":
            textVariant === "grey-link",
        },
        {
          "font-medium text-black text-xs sm:text-lg":
            textVariant === "profile-tab",
        },
        {
          "font-bold  text-black text-base sm:text-lg":
            textVariant === "dark-label",
        },
        { "mb-1 font-spectral font-bold text-lg": textVariant === "paired-p" },
        { "font-normal text-sm sm:text-lg": textVariant === "dark-link" },
        { "font-bold text-sm sm:text-lg": textVariant === "dark-link-bold" },
        {
          "font-bold text-xl text-center md:text-2xl text-purple underline ml-1":
            textVariant === "purple-link",
        },
        {
          "font-medium text-sm text-red-600 text-center block mt-1":
            textVariant === "error",
        },
        { "font-medium text-xs ml-3": textVariant === "small-checkbox" },
        { "font-medium text-sm ml-3": textVariant === "checkbox" },
        {
          "font-normal text-sm text-center sm:text-xl":
            textVariant === "selected-item",
        },
        {
          "font-bold text-black text-sm sm:text-xl":
            textVariant === "action-button",
        },
        {
          "font-bold text-sm sm:text-lg letter-wider text-black":
            textVariant === "contribution-field",
        },
        {
          "font-semibold text-3xl text-center letter-wider":
            textVariant === "contribution-h",
        },
        {
          "font-semibold text-xl text-center letter-wider":
            textVariant === "contribution-base-h",
        },
        {
          "font-normal text-lg text-black letter-wider":
            textVariant === "contribution-description",
        },
        {
          "font-normal text-sm text-slate-600 cursor-pointer":
            textVariant === "results",
        },
        { "text-sm": textVariant === "libre-sm" },
        { "font-bold text-2xl": textVariant === "libre-xl" },
        { "text-sm italic": textVariant === "libre-italic" },
        {
          "font-normal not-italic text-lg": textVariant === "libre-normal",
        },
        {
          "font-bold text-2xl text-center sm:text-4xl": textVariant === "libre",
        },
        {
          "text-2xl text-center sm:text-2xl": textVariant === "libre-2xl",
        },
        {
          "font-bold text-2xl text-center sm:text-2xl":
            textVariant === "libre-bold",
        },
        { "font-normal text-xs text-light-grey": textVariant === "gray-label" },
        { "font-bold text-center md:text-base": textVariant === "base-h" },
        {
          "font-bold text-center text-xs md:text-sm": textVariant === "filter",
        },
        {
          "font-medium text-sm text-center md:text-lg":
            textVariant === "lg-span",
        },
        { "font-bold md:text-3xl": textVariant === "md-h" },
        { "font-bold text-sm md:text-lg": textVariant === "lg-h" },
        {
          "font-bold text-2xl text-center md:text-3xl": textVariant === "3xl-h",
        },
        {
          "font-normal text-xs text-center md:text-base":
            textVariant === "base-p",
        },
        {
          "font-normal text-sm text-center md:text-lg": textVariant === "lg-p",
        },
        { "font-bold text-sm text-center md:text-xl": textVariant === "xl-p" },
        {
          "font-normal text-xl text-center md:text-2xl":
            textVariant === "2xl-p",
        },
        { "font-normal italic text-sm": textVariant === "italic" },
        {
          "font-bold text-sm text-fourth-grey":
            textVariant === "contribution-label",
        },
        { "font-bold text-xl letter-wider": textVariant === "favorite-brand" },
        {
          "font-medium text-base letter-wider":
            textVariant === "favorite-product",
        },
        {
          "font-normal text-base letter-wider":
            textVariant === "favorite-shade",
        },
        {
          "font-bold text-xs md:text-base text-black cursor-pointer sm:uppercase":
            textVariant === "guide-banner",
        },
        { "": textVariant === "favorite-price" },
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
export { Text };
