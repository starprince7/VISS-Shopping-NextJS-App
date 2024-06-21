import React from "react";
import { useRouter } from "next/router";
import { Container } from "@mui/material";

import {
  Footer,
  HeaderClient,
  ProductsWithSpecificCategory,
} from "../../components";

const CatergorySlugPage = () => {
  const { query } = useRouter();
  const { slug } = query;
  return (
    <>
      <HeaderClient />
      <Container>
        <ProductsWithSpecificCategory categoryName={slug as string} />
      </Container>
      <Footer />
    </>
  );
};

export default CatergorySlugPage;
