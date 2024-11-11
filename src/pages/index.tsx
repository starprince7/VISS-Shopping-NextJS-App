import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { ProductCarousel } from "../components/molecule/ProductCarousel";
import {
  Banner,
  Categories,
  Footer,
  HeaderClient,
  ProductsShowcase,
} from "../components";
import { ProductCarouselMobile } from "../components/molecule/ProductCarouselMobile";
import { useDeviceType } from "../hooks";
import db from "../database/connection/dbConnection";
import CategoryModel from "../database/models/categorySchema";
import Product from "../database/models/productSchema";

export async function getServerSideProps() {
  try {
    console.log("Home page server rendering...");

    // Connect to database
    await db.connectDB().catch((err) => console.log("Error:", err));

    // Fetch data
    const [categories, products] = await Promise.all([
      CategoryModel.find().lean(), // .lean() for better performance
      Product.find().sort({ date_created: -1 }).limit(5).lean(),
    ]);

    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories || [])),
        products: JSON.parse(JSON.stringify(products || [])),
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        categories: [],
        products: [],
        error: "Failed to fetch data",
      },
    };
  }
}

export default function HomePage({
  categories,
  products,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("Server-side error:", error);
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
