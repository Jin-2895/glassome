import React, { ReactNode } from "react";
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import cn from "classnames";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const sliderSettings = {
  320: {
    slidesPerView: 1,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  900: {
    slidesPerView: 3,
  },
  1024: {
    slidesPerView: 3,
  },
};

interface SliderProps<T> extends SwiperProps {
  sliderItems: T[];
  renderItem: (item: T) => ReactNode;
  EmptyStateComponent?: ReactNode;
  leftArrowStyles?: string;
  rightArrowStyles?: string;
}

const Slider = <T extends { id: string }>({
  sliderItems,
  renderItem,
  EmptyStateComponent,
  breakpoints,
  leftArrowStyles,
  rightArrowStyles,
  ...rest
}: SliderProps<T>) => {
  return (
    <div className="relative">
      <div className="mt-16 flex items-center">
        {!!sliderItems.length && (
          <span
            className={cn(
              "swiper-button-next absolute z-20 bottom-0 swiper-sm:top-1/2 right-[-20px]",
              rightArrowStyles
            )}
          >
            <BsArrowRight size={30} />
          </span>
        )}
        {!!sliderItems.length && (
          <span
            className={cn(
              "swiper-button-prev absolute z-20 bottom-0 swiper-sm:top-1/2 left-[-20px]",
              leftArrowStyles
            )}
          >
            <BsArrowLeft size={30} />
          </span>
        )}
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            disabledClass: "swiper-button-disabled",
          }}
          breakpoints={breakpoints || sliderSettings}
          updateOnWindowResize
          {...rest}
        >
          {sliderItems.map((sliderItem) => (
            <SwiperSlide className="slide" key={sliderItem.id}>
              {renderItem(sliderItem)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {EmptyStateComponent}
    </div>
  );
};

export { Slider };
