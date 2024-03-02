import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Badge, BadgeProps } from "@mui/material";
import styled from "@emotion/styled";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 8,
    color: "#003868",
    // padding: "0 4px",
  },
}));

/* Cart Component */
export const Cart = () => {
  return (
    <StyledBadge badgeContent={2} color="primary">
      <ShoppingBasketIcon sx={{ color: "#003868d9", fontSize: 30 }} />
    </StyledBadge>
  );
};
