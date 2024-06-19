import { Box, Popover, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCart } from "../../store/cartSlice";
import CartItem from "./Cart-Items";
import { CheckoutButton } from "../ui/Checkout-Button";

interface CartListPopoverProps {
  id: string;
  open: boolean;
  anchorEl: Element;
  handleClose: () => void;
}

export default function CartPopover({
  anchorEl,
  id,
  handleClose,
  open,
}: CartListPopoverProps) {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      PaperProps={{
        sx: {
          backgroundColor: "#141414",
          width: 550,
          border: "solid 1px #353535",
        },
      }}
    >
      <Cart />
    </Popover>
  );
}

function Cart() {
  const cart = useSelector(selectCart)
  const numberOfItemsInCart = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, width: '100%', bgcolor: 'white' }}>
      {!!cart.length ?
        <Typography fontWeight={600} sx={{ fontSize: 20 }}>
          Your baggage has {numberOfItemsInCart} {numberOfItemsInCart > 1 ? 'items' : 'item'}:
        </Typography>
        :
        <Typography fontWeight={600} sx={{ fontSize: 20 }}>
          Your baggage is empty!
        </Typography>}
      {!!cart.length && cart.map(item => (
        <CartItem key={item.productNumber} {...item} />
      ))}
      {!!cart.length && (
        <>
          <br />
          <CheckoutButton />
        </>
      )}
    </Box>
  )
}
