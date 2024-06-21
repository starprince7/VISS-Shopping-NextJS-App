import React from "react";
import Image from "next/image";
import { Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Mousewheel, Navigation, Pagination } from "swiper/modules";

export const Banner = () => {
  return (
    <Container className="my-3">
      <Swiper
        className="sm:h-80 h-48"
        spaceBetween={30}
        centeredSlides
        loop
        zoom
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        direction="horizontal"
        slidesPerView={1}
        mousewheel={false}
        pagination={false}
        modules={[Mousewheel, Pagination, Autoplay, Navigation]}
      >
        {images.map(({ src }) => (
          <SwiperSlide>
            <Image
              src={src}
              width={1080}
              height={720}
              alt="Banner Image"
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

const images = [
  { src: "/images/1.jpg" },
  { src: "/images/2.jpg" },
  { src: "/images/3.jpg" },
  { src: "/images/4.jpg" },
];
