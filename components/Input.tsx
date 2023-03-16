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
  onSearchButtonClick?: () => void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

type RestProps = {
  [key: string]: any;
};

export const Input = ({
  sx = {},
  onSearchButtonClick = () => {},
  label,
  type,
  onChange,
  ...rest
}: Props & RestProps) => {
  return (
    <FormControl sx={{ m: 1 }} variant="outlined">
      <InputLabel htmlFor={`outlined-adornment-${label}`}>{label}</InputLabel>
      <OutlinedInput
        onChange={onChange}
        sx={{ ...sx }}
        id={`outlined-adornment-${label}`}
        type={type}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onSearchButtonClick}
              edge="end"
              {...rest}
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
