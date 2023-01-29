import React from "react";
import { NextPage } from "next";

import { Typography } from "@mui/material";
import { Layout } from "../../../components/molecule";
import { FlexRow, Input } from "../../../components";

const ProductsPage: NextPage = () => {
  return (
    <Layout className="bg-background">
      <FlexRow
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          my: 1,
        }}
      >
        <Typography variant="h4" fontWeight={600} color="secondary.main">
          Products
        </Typography>
        <FlexRow justifyContent="center" alignItems="center">
          <Input
            sx={{ width: { xs: 350, md: 450 }, bgcolor: "white" }}
            type="text"
            label="Search products..."
          />
          {/* <Button
            disableElevation
            variant="contained"
            color="primary"
            sx={{ color: "white", fontSize: "13px", py: 1.8 }}
            style={{ background: "#89A67E" }}
            startIcon={<AddBoxIcon />}
          >
            Add Product
          </Button> */}
        </FlexRow>
      </FlexRow>
    </Layout>
  );
};
export default ProductsPage;
