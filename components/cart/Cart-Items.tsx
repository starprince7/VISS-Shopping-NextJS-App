import { useDispatch } from "react-redux";
import { Box, Button, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { FlexRow } from "../FlexRow";
import { formatToCurrency } from "../../utils/currencyFormatter";
import { removeFromCart } from "../../store/cartSlice";
import type { CartItem as CartItemType } from "../../types";
import { useProduct } from "../../hooks";
import { CartItemLoadingSkeleton } from "../Skeleton";

function CartItem({ productNumber, productId, quantity }: CartItemType) {
  const { isLoading, data, error } = useProduct(productId);
  const dispatch = useDispatch();

  if (isLoading) return <CartItemLoadingSkeleton />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
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
          style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 5 }}
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
        <FlexRow
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
        </FlexRow>
      </div>
    </Box>
  );
}

export default CartItem;
