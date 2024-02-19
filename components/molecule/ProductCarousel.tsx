import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
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
        width={1080}
        height={720}
        src={product.image}
        alt={product.title}
        className="min-h-40 max-h-52 object-cover w-[60%] rounded-3xl border border-primary"
      />
    </SwiperSlide>
  ));

  return (
    <Container
      className={className}
      sx={{ borderRadius: 2, position: "relative", my: 5 }}
      disableGutters
    >
      <div className="absolute w-60 bg-gradient-to-r from-primary to-transparent h-full z-10  bottom-0"></div>
      <Swiper
        spaceBetween={5}
        slidesPerView={4}
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
      <div className="absolute w-60 bg-gradient-to-l from-primary to-transparent h-full z-10  bottom-0 right-0"></div>
    </Container>
  );
};
