import { Typography } from "@mui/material";

import { FlexCol } from "../FlexCol";
import { FlexRow } from "../FlexRow";
import { ProductCard } from "../atom";
import { useProducts } from "../../hooks";
import { ProductCardSkeleton } from "../Skeleton/product-card-skeleton";

type PWSCProps = {
  categoryName: string;
};
export const ProductsWithSpecificCategory = ({ categoryName }: PWSCProps) => {
  const { data: products, status, error } = useProducts(categoryName);
  /**
   * DESCRIBE:
   * It will fetch list of product of same category and render this list of product.
   * Use the passed prop `categoryName` to fetch list of
   * IMPLEMENTATION:
   * products of the same category and render with the product card component.
   */
  return (
    <FlexCol sx={{ mt: 6 }}>
      <Typography
        sx={{ fontWeight: 600, fontSize: 26, my: 6 }}
        className=" mb-3 text-primary text-center capitalize"
      >
        {categoryName.toLowerCase() === "watch"
          ? "See our watches"
          : !!products?.length && `See our ${categoryName}`}
      </Typography>

      <FlexRow
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 1, sm: 2 },
        }}
      >
        {status === "pending" &&
          new Array(5)
            .fill(true)
            .map((_, i) => <ProductCardSkeleton key={i} />)}
        {status === "success" &&
          products.map((product) => (
            <ProductCard {...product} key={product._id} />
          ))}
      </FlexRow>
    </FlexCol>
  );
};
