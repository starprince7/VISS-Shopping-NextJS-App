import React from "react";
import { Container } from "@mui/material";

import { Category } from "../../types";

import { ProductsWithSpecificCategory } from "./PWSCategory";
/**
 * This component will fetch all available categories
 * And render products horizontally for each category
 * fetched.
 */
type Props = {
  categories: Category[];
};

export const ProductsShowcase = ({ categories }: Props) => {
  return (
    <Container className="my-6">
      {categories.map(({ name }, i) => (
        <ProductsWithSpecificCategory key={i} categoryName={name} />
      ))}
    </Container>
  );
};
