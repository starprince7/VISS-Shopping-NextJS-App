import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ProductCarousel } from "../../components/molecule/ProductCarousel";
import {
  Banner,
  Categories,
  Footer,
  HeaderClient,
  ProductsShowcase,
} from "../../components";
import { ProductCarouselMobile } from "../../components/molecule/ProductCarouselMobile";
import { useDeviceType } from "../../hooks";
import { Category } from "../../types";

export default function HomePage({
  categories,
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const deviceType = useDeviceType();
  return (
    <>
      <HeaderClient className="header" />
      <div className="bg-primary space-y-24">
        <Banner />

      </div>
      <Categories categories={categories} />
      <div className="">
        {deviceType === "desktop" && <ProductCarousel products={products} />}
        {deviceType === "tablet" && <ProductCarousel products={products} />}
        {deviceType === "mobile" && (
          <ProductCarouselMobile products={products} />
        )}
      </div>

      <ProductsShowcase categories={categories} />
      {/* products of specific categories */}
      {/* footer */}
      <Footer />
    </>
  );
}

export const getServerSideProps = (async () => {
  const categories = await fetch("http://localhost:3000/api/categories").then(
    (res) => res.json(),
  );
  const page = 1;
  const limit = 5;
  const { products } = await fetch(
    `http://localhost:3000/api/products?page=${page}&limit=${limit}`,
  ).then((res) => res.json());

  return {
    props: {
      categories: categories || [],
      products: products || [],
    },
  };
}) satisfies GetServerSideProps<{ categories: Category[] }>;
