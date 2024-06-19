import { Box, Button, Stack, Typography } from "@mui/material";
import { Container } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { FlexCol, FlexRow, HeaderClient } from "../../components";
import { formatToCurrency } from "../../utils/currencyFormatter";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, selectCart } from "../../store/cartSlice";
import { CartItem } from "../../types";
import { useProduct } from "../../hooks";
import CartItemLoadingSkeleton from "../../components/Skeleton/CartItemLoader";
import { GetServerSidePropsContext } from "next";
import getValidAuthentication from "../../utils/middleware/validateAPIRequest";
import getServerSession from "../../utils/middleware/get-server-session";
import { useSession } from "../../context/session-provider";
import { PaystackPaymentButton } from "../../components/payment-button/PaystackButton";

function CartItemInCheckoutPage({
  productNumber,
  productId,
  quantity,
}: CartItem) {
  const { isLoading, data, error } = useProduct(productId);
  const dispatch = useDispatch();

  if (isLoading) return <CartItemLoadingSkeleton />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "inherit",
        py: 1.8,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <img
          src={data?.image}
          alt="thumbnail"
          style={{
            width: 100,
            height: 120,
            objectFit: "cover",
            borderRadius: 5,
          }}
        />
        <div className="w-full">
          <Typography sx={{ fontSize: { xs: 12, sm: 16 } }}>
            {data?.title}
          </Typography>
          <Stack direction="row" gap={2}>
            <Typography
              sx={{
                color: "GrayText",
                fontSize: { xs: 10, sm: 12 },
                width: 50,
                textTransform: "capitalize",
              }}
            >
              <b>{quantity}</b> in cart
            </Typography>
            <Typography
              sx={{
                flex: 1,
                color: "GrayText",
                fontSize: { xs: 10, sm: 12 },
                width: 50,
                textTransform: "capitalize",
              }}
            >
              <b>{data?.countInStock}</b> Stocks left
            </Typography>
          </Stack>
        </div>
      </Box>
      <div>
        <FlexCol
          sx={{ alignItems: "center", gap: 1.5, flexWrap: "wrap-reverse" }}
        >
          <Typography sx={{ fontSize: { xs: 12, sm: 16 } }}>
            {formatToCurrency(data?.price!, "NGN")}
          </Typography>
          <Button
            color="error"
            endIcon={<CloseIcon />}
            sx={{ textTransform: "capitalize", fontSize: 12 }}
            style={{ outline: "none" }}
            onClick={() => {
              dispatch(removeFromCart({ productId }));
            }}
          >
            Remove
          </Button>
        </FlexCol>
      </div>
    </Box>
  );
}

function CheckoutPage() {
  const session = useSession();
  console.log("Current session:", session);
  const cart = useSelector(selectCart);
  const totalAmountInCart = cart.reduce((acc, cartItem) => {
    const itemTotal = cartItem.price * cartItem.quantity;
    return acc + (itemTotal ? itemTotal : 0);
  }, 0);
  const numberOfItemsInCart = cart.reduce(
    (acc, cartItem) => acc + cartItem.quantity,
    0,
  );

  return (
    <>
      <HeaderClient />
      <Container maxWidth="lg">
        <FlexRow
          sx={{
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 6,
            my: 5,
          }}
        >
          <Stack direction="column" gap={1} className="w-full">
            {!!cart.length &&
              cart.map((cartItem) => <CartItemInCheckoutPage {...cartItem} />)}
          </Stack>
          <Box
            height={270}
            minWidth={350}
            className="shadow-md rounded-md p-2 sm:p-5"
          >
            <Stack direction="column" gap={2} className="my-3">
              <FlexRow justifyContent="space-between">
                <Typography>Sum Total</Typography>
                <Typography fontWeight={600}>
                  {formatToCurrency(totalAmountInCart, "NGN")}
                </Typography>
              </FlexRow>
              <FlexRow justifyContent="space-between">
                <Typography>Item(s) in cart:</Typography>
                <Typography>{numberOfItemsInCart}</Typography>
              </FlexRow>
              <FlexRow justifyContent="space-between">
                <Typography color="GrayText">VAT:</Typography>
                <Typography color="GrayText">NGN 0.00</Typography>
              </FlexRow>
            </Stack>
            <PaystackPaymentButton />
            <Typography color="GrayText" fontSize={14}>
              By clicking pay you agree to your usage of cookies.
            </Typography>
          </Box>
        </FlexRow>
      </Container>
    </>
  );
}

export default CheckoutPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { req, res } = ctx;
  const session = getServerSession(req);

  if (!session) {
    return {
      redirect: {
        // destination: "/auth/signup?callbackUrl=/checkout",
        destination: "/auth/login?callbackUrl=/checkout",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
