import React from "react";
import { colors, createTheme } from "@mui/material";
import { lightGreen, yellow } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    primary: {
      ...lightGreen,
      main: "#89A67E",
      light: "#EDEDED",
      contrastText: "#000000",
    },
    secondary: {
      ...lightGreen,
      main: "#3A3A3A",
      contrastText: "#3A3A3A",
      dark: "#ffffff",
      light: "#CFCFCF",
    },
    darker: { main: "#64748B", contrastText: "#fff" },
    warning: { ...yellow, dark: "#BF953F" },
    background: {
      paper: "#ffffff",
      darker: "lightgray",
      default: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          "&.Mui-disabled": {
            background: "#89a67e73",
            color: "#fdfdfd8c",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
    tiny: {
      fontSize: 10,
    },
    caption: {},
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    darker: Palette["primary"];
  }
  interface PaletteOptions {
    darker: PaletteOptions["primary"];
  }
  interface TypeBackground {
    darker?: string;
  }
  interface TypographyVariants {
    tiny: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    tiny?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    tiny: true;
  }
}

declare module "@mui/material/Button" {
  export interface ButtonPropsColorOverrides {
    darker: true;
  }
}
