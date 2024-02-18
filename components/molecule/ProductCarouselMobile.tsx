import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { fetchProducts } from "../../store/productsSlice/reducer";
import { selectProductsState } from "../../store/productsSlice/selectors";
import { Container } from "@mui/material";

type Props = {
  className?: string;
};

export const ProductCarouselMobile = ({ className }: Props) => {
  const dispatch = useDispatch();
  const { products, productsRequestStatus, page, totalCount, hasMore } =
    useSelector(selectProductsState);

  const loadProducts = React.useCallback(() => {
    dispatch(fetchProducts({ page: page + 1 }) as any);
  }, [page, dispatch]);

  const loadPreviousProducts = () => {
    dispatch(fetchProducts({ page: page + 1 }) as any);
  };

  React.useEffect(() => {
    loadProducts();
  }, [dispatch]);

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
