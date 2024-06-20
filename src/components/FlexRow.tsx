import React from "react";
import { Box, BoxProps, PaperProps } from "@mui/material";

export const FlexRow = ({
  children,
  sx = {},
  ...rest
}: BoxProps & Partial<PaperProps>) => {
  return (
    <Box {...rest} sx={{ display: "flex", flexDirection: "row", ...sx }}>
      {children}
    </Box>
  );
};
