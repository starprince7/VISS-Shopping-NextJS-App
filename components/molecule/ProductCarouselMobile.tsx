import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Product } from "../../types";

type Props = {
  className?: string;
  products: Product[];
};

export const ProductCarouselMobile = ({ className, products }: Props) => {
  const renderSwipeItems = products.map((product) => (
    <SwiperSlide key={product._id} className="mr-4">
      <div className="w-32 h-32 sm:h-auto sm:w-60 rounded-3xl overflow-hidden bg-primary">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[130px] border-primary object-contain"
        />
      </div>
    </SwiperSlide>
  ));

  return (
    <div className="relative my-5">
      <div className="absolute w-24 bg-gradient-to-r from-primary to-transparent h-full z-10 bottom-0 pointer-events-none"></div>
      <Swiper
        className={className}
        spaceBetween={5}
        slidesPerView={3}
        simulateTouch
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        modules={[EffectCoverflow, Pagination, Navigation]}
      >
        {renderSwipeItems}
      </Swiper>
      <div className="absolute w-24 bg-gradient-to-l from-primary to-transparent h-full z-10  bottom-0 right-0 pointer-events-none"></div>
    </div>
  );
};
