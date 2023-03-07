import {
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";

type DefaultProps = {
  required?: boolean;
  title: string;
  placeholder?: string;
  type?: string;
  options?: any[];
  onChange?: any;
  value?: any;
  textArea?: boolean;
};

type RequiredSelectTagProps = {
  options: any[];
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
} & Partial<DefaultProps>;

type Props = RequiredSelectTagProps | DefaultProps;

export const CustomInput = ({
  required,
  textArea,
  title,
  placeholder,
  type = "text",
  options = [],
  value,
  onChange,
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
          required={required}
          labelId="input-select"
          id="input-select"
          value={value}
          label="Age"
          onChange={onChange}
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
          required={required}
          rows={4}
          value={value}
          onChange={onChange}
          style={{
            border: "solid #CFCFCF 2px",
            borderRadius: 5,
            padding: "8px",
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
        required={required}
        type={type}
        value={value}
        onChange={onChange}
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
