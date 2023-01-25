import React from "react";
import { Box, BoxProps, PaperProps } from "@mui/material";

export const FlexCol = ({
  children,
  sx,
  ...rest
}: BoxProps & Partial<PaperProps>) => {
  return (
    <Box {...rest} sx={{ display: "flex", flexDirection: "column", ...sx }}>
      {children}
    </Box>
  );
};
