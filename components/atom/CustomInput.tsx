import {
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";

type DefaultProps = {
  title: string;
  placeholder?: string;
  type?: string;
  options?: string[];
  handleChange?: any;
  value?: any;
  textArea?: boolean;
};

type RequiredSelectProps = {
  options: string[];
  value: string;
  handleChange: (e: SelectChangeEvent<string>) => void;
} & Partial<DefaultProps>;

type Props = RequiredSelectProps | DefaultProps;

export const CustomInput = ({
  textArea,
  title,
  placeholder,
  type = "text",
  options = [],
  value,
  handleChange,
}: Props) => {
  if (options.length) {
    return (
      <div style={{ marginBottom: 15 }}>
        <Typography
          component="label"
          variant="subtitle1"
          sx={{
            display: "block",
            textTransform: "capitalize",
            color: "#727272",
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Select
          labelId="input-select"
          id="input-select"
          value={value}
          label="Age"
          onChange={handleChange}
          sx={{
            border: "solid #CFCFCF 1px",
            borderRadius: 2,
            my: 0.5,
            px: 1,
            width: "100%",
            color: "#1E1E1E",
          }}
        >
          {options.map((option, index) => (
            <MenuItem value={option} key={index}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }

  if (textArea) {
    return (
      <div style={{ marginBottom: 15 }}>
        <Typography
          component="label"
          variant="subtitle1"
          sx={{
            display: "block",
            textTransform: "capitalize",
            color: "#727272",
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <textarea
          rows={4}
          style={{
            border: "solid #CFCFCF 2px",
            borderRadius: 5,
            padding: "0.3px 1px",
            width: "100%",
            color: "#1E1E1E",
          }}
          placeholder={placeholder}
        ></textarea>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 15 }}>
      <Typography
        component="label"
        variant="subtitle1"
        sx={{
          display: "block",
          textTransform: "capitalize",
          color: "#727272",
          mb: 0.5,
        }}
      >
        {title}
      </Typography>
      <InputBase
        type={type}
        sx={{
          border: "solid #CFCFCF 2px",
          borderRadius: 2,
          py: 1.2,
          px: 1,
          width: "100%",
          color: "#1E1E1E",
        }}
        placeholder={placeholder}
      />
    </div>
  );
};
