import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ProductCarousel } from "../../components/molecule/ProductCarousel";
import {
  Banner,
  Categories,
  HeaderClient,
  ProductsShowcase,
} from "../../components";
import { ProductCarouselMobile } from "../../components/molecule/ProductCarouselMobile";
import { useDeviceType } from "../../hooks";
import { Category } from "../../types";

export default function HomePage({
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const deviceType = useDeviceType();
  return (
    <div>
      <HeaderClient className="header" />
      <div className="bg-primary py-5">
        <Banner />
        {deviceType === "desktop" && <ProductCarousel />}
        {deviceType === "tablet" && <ProductCarousel />}
        {deviceType === "mobile" && <ProductCarouselMobile />}
      </div>
      <Categories categories={categories} />
      <ProductsShowcase categories={categories} />
      {/* products of specific categories */}
      {/* footer */}
    </div>
  );
}

export const getServerSideProps = (async () => {
  const categories = await fetch("http://localhost:3001/api/categories").then(
    (res) => res.json(),
  );

  return {
    props: {
      categories: categories || [],
    },
  };
}) satisfies GetServerSideProps<{ categories: Category[] }>;
