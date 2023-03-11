import React from "react";
import { NextPage } from "next";
import { Button, Typography } from "@mui/material";

import { Layout } from "../../../components/molecule";
import { FlexCol, FlexRow, Input } from "../../../components";
import Orders from "../../../components/molecule/Orders";

const OrdersPage: NextPage = () => {
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
          Orders
        </Typography>
        <FlexRow justifyContent="center" alignItems="center">
          <Input
            sx={{ width: { xs: 350, md: 450 }, bgcolor: "white" }}
            type="text"
            label="Search by order ID"
          />
          <Button
            disableElevation
            variant="contained"
            color="primary"
            sx={{ color: "white", fontSize: "13px", py: 1.8 }}
            style={{ background: "#89A67E" }}
            // startIcon={<AddBoxIcon />}
          >
            Find
          </Button>
        </FlexRow>
      </FlexRow>
      <FlexCol sx={{ px: 2 }}>
        <Orders />
      </FlexCol>
    </Layout>
  );
};
export default OrdersPage;
