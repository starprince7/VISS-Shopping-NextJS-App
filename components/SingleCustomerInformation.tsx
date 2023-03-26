import { Avatar, Box, Chip, IconButton, Typography } from "@mui/material";
import Person4Icon from "@mui/icons-material/Person4";
import {
  CloseSharp as CloseIcon,
  TaskAlt as VerifiedIcon,
} from "@mui/icons-material";
import React from "react";
import { formatToCurrency } from "../utils/currencyFormatter";
import { FlexCol } from "./FlexCol";
import { FlexRow } from "./FlexRow";
import { getColorFromString } from "../utils/getColorFromString";
import { CustomerType } from "../types";

type Props = CustomerType & { handleClose: () => void };

export const SingleCustomerInformation = ({
  handleClose = () => {},
  name,
  date_registered,
  email,
  fullName,
  wallet,
  cart,
  shippingInfo,
  isEmailVerified,
  isPhoneVerified,
}: Props) => {
  const { phoneNumber } = shippingInfo[0];
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
                bgcolor: `${getColorFromString(
                  fullName || name.lastname || name.firstname,
                )}`,
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
            {fullName && fullName}{" "}
            {!fullName ? Object.values(name).map((v) => `${v} `) : ""}
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "#727272" }}>
            Date of Sign Up
          </Typography>
          <Chip label={date_registered} />
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "#727272" }}>
            Email address
          </Typography>
          <FlexRow alignItems="start" className="space-x-1">
            <Chip label={email as React.ReactNode} />
            {isEmailVerified && (
              <VerifiedIcon color="primary" sx={{ width: 19 }} />
            )}
          </FlexRow>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "#727272" }}>
            Phone Number
          </Typography>
          <FlexRow alignItems="start" className="space-x-1">
            <Chip label={phoneNumber as React.ReactNode} />
            {isPhoneVerified && (
              <VerifiedIcon color="primary" sx={{ width: 19 }} />
            )}
          </FlexRow>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "#727272" }}>
            Wallet Balance
          </Typography>
          <Chip label={formatToCurrency(wallet, "NGN")} />
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "#727272" }}>
            Cart Items
          </Typography>
          <Chip label={cart.length < 10 && `0${cart.length}`} />
        </Box>
      </div>
      <IconButton onClick={handleClose}>
        <CloseIcon sx={{ fontSize: "2.3rem" }} />
      </IconButton>
    </FlexRow>
  );
};
