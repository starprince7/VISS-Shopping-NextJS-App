import React from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  SxProps,
  Theme,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

type Props = {
  label: string;
  sx?: SxProps<Theme> | undefined;
  type: "text" | "password";
};

export const Input = ({ sx = {}, label, type, ...rest }: Props) => {
  return (
    <FormControl sx={{ m: 1 }} variant="outlined">
      <InputLabel htmlFor={`outlined-adornment-${label}`}>{label}</InputLabel>
      <OutlinedInput
        sx={{ ...sx }}
        id={`outlined-adornment-${label}`}
        type={type}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              //   onClick={handleClickShowPassword}
              edge="end"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
};
