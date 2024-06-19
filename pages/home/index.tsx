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
import db from "../../database/connection/dbConnection";
import CategoryModel from "../../database/models/categorySchema";
import Product from "../../database/models/productSchema";

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
  await db.connectDB();

  const categories = await CategoryModel.find();
  const page = 1;
  const limit = 5;

  const products = await Product.find()
    .sort({ date_created: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit))
    .exec();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories || [])),
      products: JSON.parse(JSON.stringify(products || [])),
    },
  };
}) satisfies GetServerSideProps<{ categories: Category[] }>;
