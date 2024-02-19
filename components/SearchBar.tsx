import { InputBase } from "@mui/material";
import { SearchSharp as SearchSharpIcon } from "@mui/icons-material";
import React from "react";

export const SearchBar = () => {
  return (
    <div className="flex-1 border border-neutral-300 rounded-3xl sm:rounded-md flex items-center justify-between px-2">
      <SearchSharpIcon sx={{ color: "silver", fontSize: 22 }} />
      <InputBase
        placeholder="Search watches, brands and categories..."
        sx={{
          py: 0.8,
          px: 1,
          fontSize: 15,
          width: "100%",
        }}
      />
    </div>
  );
};
