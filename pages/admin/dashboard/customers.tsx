import React from "react";
import { NextPage } from "next";
import { Button, Typography } from "@mui/material";

import { Layout } from "../../../components/molecule";
import { FlexRow, Input } from "../../../components";
import Customers from "../../../components/molecule/Customers";

const CustomersPage: NextPage = () => {
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
          Customers
        </Typography>
        <FlexRow justifyContent="center" alignItems="center">
          <Input
            sx={{ width: { xs: 350, md: 450 }, bgcolor: "white" }}
            type="text"
            label="Search products and brands..."
          />
          <Button
            disableElevation
            variant="contained"
            color="primary"
            sx={{ color: "white", fontSize: "13px", py: 1.8 }}
            style={{ background: "#89A67E" }}
            // startIcon={<AddBoxIcon />}
          >
            Find Customer
          </Button>
        </FlexRow>
      </FlexRow>
      <FlexRow sx={{ px: 2 }}>
        <Customers />
      </FlexRow>
    </Layout>
  );
};
export default CustomersPage;
