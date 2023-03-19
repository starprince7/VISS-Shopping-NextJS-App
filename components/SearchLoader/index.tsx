import { Box } from "@mui/material";
import React from "react";

type Prop = {
  loading: boolean;
};

export const SearchIconLoader = ({ loading }: Prop) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        minHeight: "100vh",
        width: "100%",
        zIndex: 1000,
        bgcolor: "white",
        display: loading ? "grid" : "none",
        placeItems: "center",
      }}
    >
      <div className="loadingio-spinner-magnify-gosd16rm1tl">
        <div className="ldio-i8o6i3n8mdo">
          <div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};
