import React from "react";
import { useSelector } from "react-redux";
import ShoppingBasketTwoTone from "@mui/icons-material/ShoppingBasketTwoTone";
import { Badge, BadgeProps, IconButton } from "@mui/material";
import styled from "@emotion/styled";

import { selectCart } from "../../store/cartSlice";

import CartPopover from "./CartPopover";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 8,
    color: "#003868",
    // padding: "0 4px",
  },
}));

/* CartBadge Component */
export const CartBadge = () => {
  const cart = useSelector(selectCart);
  const numberOfItemsInCart = cart.reduce(
    (acc, cartItem) => acc + cartItem.quantity,
    0,
  );
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton onClick={handleClick} style={{ outline: "none" }}>
        <StyledBadge badgeContent={numberOfItemsInCart || "0"} color="primary">
          <ShoppingBasketTwoTone sx={{ color: "#003868d9", fontSize: 30 }} />
        </StyledBadge>
      </IconButton>
      <CartPopover
        anchorEl={anchorEl!}
        handleClose={handleClose}
        id={id!}
        open={open}
      />
    </>
  );
};
