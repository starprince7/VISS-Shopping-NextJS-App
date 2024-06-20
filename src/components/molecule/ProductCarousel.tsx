import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Container } from "@mui/material";
import { Product } from "../../types";

type Props = {
  className?: string;
  products: Product[];
};

export const ProductCarousel = ({ className, products }: Props) => {
  const renderSwipeItems = products.map((product) => (
    <SwiperSlide key={product._id} className="mr-4">
      <Image
        width={780}
        height={420}
        src={product.image}
        alt={product.title}
        className="min-h-40 max-h-72 object-cover w-[95%] rounded-3xl border border-primary"
      />
    </SwiperSlide>
  ));

  return (
    <Container
      className={className}
      sx={{ borderRadius: 2, position: "relative", my: 5, py: 1 }}
      disableGutters
    >
      <div className="absolute w-60 h-full z-10  bottom-0" />
      <Swiper
        autoplay={{
          delay: 2300,
          disableOnInteraction: true,
        }}
        spaceBetween={1}
        slidesPerView={4}
        simulateTouch
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        coverflowEffect={{
          rotate: 5,
          stretch: 26,
          depth: 100,
          modifier: 4.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
      >
        {renderSwipeItems}
      </Swiper>
      <div className="absolute w-60 h-full z-10  bottom-0 right-0" />
    </Container>
  );
};
