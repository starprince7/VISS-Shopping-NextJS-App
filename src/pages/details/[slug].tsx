import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Button, Container, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { FlexCol, FlexRow, Footer, HeaderClient } from "../../components";
import { formatToCurrency } from "../../utils/currencyFormatter";
import { useProduct } from "../../hooks";
import { ProductDetailsSkeleton } from "../../components/Skeleton";
import { addToCart } from "../../store/cartSlice";

export default function ProductDetailsSlugPage() {
  const { query } = useRouter();
  const { slug } = query;
  const { data: product, status, error } = useProduct(slug as string);
  console.log("The Product object:", product);

  const dispatch = useDispatch();

  if (status === "pending")
    return (
      <>
        <HeaderClient />
        <ProductDetailsSkeleton />
      </>
    );
  return (
    <>
      <HeaderClient />
      <Container className="md:py-24 sm:py-16 pt-2 pb-24">
        <FlexRow className="flex-col sm:flex-row sm:space-x-6">
          <Image
            width={1080}
            height={720}
            alt="Product image"
            src={product?.image ?? ""}
            className="flex-1 rounded-xl"
          />
          <FlexCol sx={{ flex: 1, p: 2 }}>
            <Typography>{product?.title}</Typography>
            <Typography sx={{ my: 1, fontWeight: 600, fontSize: 25 }}>
              {formatToCurrency(product?.price ?? 0, "NGN")}
            </Typography>
            <Rating />
            <Button
              variant="contained"
              sx={{
                my: 1,
                fontWeight: 800,
                width: { xs: "100%", sm: "60%" },
                color: "white",
                "&:hover": {
                  background: "#79936f",
                },
              }}
              className="bg-primary"
              onClick={() => {
                dispatch(
                  addToCart({
                    productId: product?.productId ?? '',
                    productNumber: product?.productNumber as number,
                    quantity: 1,
                    price: product?.price ?? 0,
                  }),
                );
              }}
            >
              Add To Cart
            </Button>
            <Typography sx={{ my: 2, color: "dimgrey" }}>
              {product?.description}
            </Typography>
          </FlexCol>
        </FlexRow>
      </Container>
      <Footer />
    </>
  );
}

function Rating() {
  return (
    <div className="my-1">
      {new Array(3).fill(true).map((_, i) => (
        <StarIcon key={i} className="w-4 text-primary" />
      ))}
      <StarBorderIcon className="w-4 text-primary" />
      <StarBorderIcon className="w-4 text-primary" />
    </div>
  );
}
