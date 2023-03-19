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
  value?: any;
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
  value,
  ...rest
}: Props & RestProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearchButtonClick();
      }}
    >
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor={`outlined-adornment-${label}`}>{label}</InputLabel>
        <OutlinedInput
          value={value}
          onChange={onChange}
          sx={{ ...sx }}
          id={`outlined-adornment-${label}`}
          type={type}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                type="submit"
                aria-label="toggle password visibility"
                // onClick={onSearchButtonClick}
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
    </form>
  );
};
