import { Avatar, Box, Chip, IconButton, Typography } from "@mui/material";
import Person4Icon from "@mui/icons-material/Person4";
import { CloseSharp as CloseIcon } from "@mui/icons-material";
import React from "react";
import { formatToCurrency } from "../utils/currencyFormatter";
import { FlexCol } from "./FlexCol";
import { FlexRow } from "./FlexRow";
import { getColorFromString } from "../utils/getColorFromString";
import { Order } from "../types";

type Props = Order & { handleClose: () => void };

export const SingleOrderInformation = ({
  orderStatus = "PENDING",
  paymentStatus = "PROCESSING",
  handleClose = () => { },
  sumTotal,
  orderDate,
  customer,
}: Props) => {
  const [deliveryChipStyling, setDeliveryChipStyle] = React.useState({});
  const [paymentStatusChipStyle, setPaymentStatusChipStyle] = React.useState(
    {},
  );

  React.useEffect(() => {
    switch (orderStatus) {
      case "PENDING":
        setDeliveryChipStyle({
          color: "#F29339",
          bgcolor: "rgba(242, 147, 57, 0.1)",
        });
        break;
      case "DELIVERED":
        setDeliveryChipStyle({
          color: "#077E8C",
          bgcolor: "rgba(7, 126, 140, 0.1)",
        });
        break;
      case "CANCELED":
        setDeliveryChipStyle({
          color: "#D9512C",
          bgcolor: "rgba(217, 81, 44, 0.1)",
        });
        break;
      default:
        break;
    }
  }, [orderStatus]);

  React.useEffect(() => {
    switch (paymentStatus) {
      case "PROCESSING":
      case "PENDING":
        setPaymentStatusChipStyle({
          color: "#F29339",
          bgcolor: "rgba(242, 147, 57, 0.1)",
        });
        break;
      case "SUCCESS":
        setPaymentStatusChipStyle({
          color: "#077E8C",
          bgcolor: "rgba(7, 126, 140, 0.1)",
        });
        break;
      case "FAILED":
        setPaymentStatusChipStyle({
          color: "#D9512C",
          bgcolor: "rgba(217, 81, 44, 0.1)",
        });
        break;
      default:
        break;
    }
  }, [paymentStatus]);

  return (
    <FlexRow
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        width: "100%",
        minHeight: 200,
        pt: "2.6rem",
        pb: "1rem",
        px: "5rem",
        alignItems: "start",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Box sx={{ mb: 4 }}>
          <FlexRow sx={{ mb: 1.3, alignItems: "center" }} className="space-x-3">
            <Avatar
              variant="square"
              sx={{
                bgcolor: `${getColorFromString("JohnDoe")}`,
                width: 32,
                height: 32,
              }}
            >
              <Person4Icon />
            </Avatar>
            <Typography variant="subtitle1" sx={{ color: "#727272" }}>
              Customer
            </Typography>
          </FlexRow>
          <Typography sx={{ fontSize: "1.2rem", color: "#494949" }}>
            {customer?.fullName && customer?.fullName}
            {!customer?.fullName && customer?.name.firstname}{" "}
            {!customer?.fullName && customer?.name.lastname}
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "#727272" }}>
            Delivery Status
          </Typography>
          <Chip
            label={orderStatus}
            sx={{ ...deliveryChipStyling, borderRadius: 2, fontSize: "1.1rem" }}
          />
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "#727272" }}>
            Order Total
          </Typography>
          <Typography sx={{ fontSize: "1.2rem", color: "#494949" }}>
            {formatToCurrency(sumTotal || 0, "NGN")}
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "#727272" }}>
            Date
          </Typography>
          <Typography sx={{ fontSize: "1.2rem", color: "#494949" }}>
            {orderDate}
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "#727272" }}>
            Payment Status
          </Typography>
          <Chip
            label={paymentStatus}
            sx={{
              ...paymentStatusChipStyle,
              borderRadius: 2,
              fontSize: "1.1rem",
            }}
          />
        </Box>
      </div>
      <IconButton onClick={handleClose}>
        <CloseIcon sx={{ fontSize: "2.3rem" }} />
      </IconButton>
    </FlexRow>
  );
};
