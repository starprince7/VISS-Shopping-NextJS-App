import Image from "next/image";
import { FlexCol } from "../FlexCol";
import { Button, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Product } from "../../types";
import { formatToCurrency } from "../../utils/currencyFormatter";

type Props = Product;

export const ProductCard = ({ image, title, price }: Props) => {
  /**
   * Describe Product Card.
   * 1. Product image
   * 2. product title
   * 3. price
   * 4. rating.
   * 5. add to cart button
   */
  return (
    <FlexCol
      className="shadow-md hover:shadow-2xl group"
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        width: "fit-content",
        minWidth: 100,
        minHeight: 390,
        maxHeight: 400,
        mb: 2,
      }}
    >
      <Image
        src={image}
        width={200}
        height={230}
        alt={title}
        style={{
          maxHeight: 240,
          minHeight: 240,
        }}
        className="object-cover"
      />
      <div className="p-2">
        <Typography fontSize="small">{title}</Typography>
        <Typography sx={{ my: 1, fontWeight: 600 }}>
          {formatToCurrency(price, "NGN")}
        </Typography>
        <div className="my-1">
          {new Array(3).fill(true).map((_, i) => (
            <StarIcon key={i} className="w-4 text-primary" />
          ))}
          <StarBorderIcon className="w-4 text-primary" />
          <StarBorderIcon className="w-4 text-primary" />
        </div>
        <Button
          variant="contained"
          sx={{
            my: 1,
            fontWeight: 800,
            width: "100%",
            color: "white",
            "&:hover": {
              background: "#79936f",
            },
          }}
          className="bg-primary md:opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
        >
          Add To Cart
        </Button>
      </div>
    </FlexCol>
  );
};
