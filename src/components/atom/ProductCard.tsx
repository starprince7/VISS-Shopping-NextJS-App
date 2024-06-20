import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { Button, Stack, Typography } from "@mui/material";
import { StarBorder as StarBorderIcon, Star as StarIcon, Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

import { FlexCol } from "../FlexCol";

import { formatToCurrency } from "../../utils/currencyFormatter";
import { addToCart, removeFromCart, selectCart } from "../../store/cartSlice";
import { Product } from "../../types";

type Props = Product;

export const ProductCard = (props: Props) => {
  const { image, title, price, productId, productNumber, _id } = props
  /**
   * Describe Product Card.
   * 1. Product image
   * 2. product title
   * 3. price
   * 4. rating.
   * 5. add to cart button
   */
  const dispatch = useDispatch()
  const cart = useSelector(selectCart)
  const productInCart = cart.find(item => item.productId === productId || item._id === _id);
  const quantity = productInCart ? productInCart.quantity : 0;
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
      <Link href={`/details/${productId || _id}`}>
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
      </Link>
      <div className="p-2">
        <Link href={`/details/${productId || _id}`}>
          <Typography
            className="hover:underline hover:text-primary hover:font-bold underline-offset-4"
            fontSize="small"
          >
            {title}
          </Typography>
        </Link>
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
        <ProductButton productQuantity={quantity} {...props} />
      </div>
    </FlexCol>
  );
};


function ProductButton({ image, title, price, productId, productNumber, _id, productQuantity }) {
  const dispatch = useDispatch()
  return (
    <>
      {productQuantity === 0 && (
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
          onClick={() => {
            dispatch(addToCart({ productId, productNumber, price, quantity: 1 }))
          }}
        >
          Add To Cart
        </Button>
      )}
      {productQuantity > 0 && (
        <Stack direction="row" gap={4} alignItems='center'>
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
            className="bg-primary md:opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"
            onClick={() => {
              dispatch(addToCart({ productId, productNumber, price, quantity: +1 }))
            }}
          >
            <AddIcon />
          </Button>
          <Typography className=" md:opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in-out">{productQuantity}</Typography>
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
            className="bg-primary md:opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"
            onClick={() => {
              dispatch(removeFromCart({ productId }))
            }}
          >
            <RemoveIcon />
          </Button>
        </Stack>
      )}
    </>
  )
}