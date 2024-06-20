import React from "react";
import { NextPage } from "next";
import { Button, Typography } from "@mui/material";

import { CompletedOrders, Layout } from "../../../components/molecule";
import { FlexCol, FlexRow, Input } from "../../../components";
import Orders from "../../../components/molecule/PendingOrders";

const CompletedOrdersPage: NextPage = () => {
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
        <Typography
          variant="h4"
          fontWeight={600}
          color="secondary.main"
          sx={{ my: 2 }}
        >
          Completed Orders
        </Typography>
        {/* <FlexRow justifyContent="center" alignItems="center">
          <Input
            sx={{ width: { xs: 350, md: 450 }, bgcolor: "white" }}
            type="text"
            label="Search by order ID"
          />
        </FlexRow> */}
      </FlexRow>
      <FlexCol sx={{ px: 2 }}>
        <CompletedOrders trackStatus="DELIVERED" />
      </FlexCol>
    </Layout>
  );
};
export default CompletedOrdersPage;
