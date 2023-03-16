import React from "react";
import { NextPage } from "next";
import { Button, Typography } from "@mui/material";

import { Layout } from "../../../components/molecule";
import {
  FlexCol,
  FlexRow,
  Input,
  SingleOrderInformation,
} from "../../../components";
import PendingOrders from "../../../components/molecule/PendingOrders";
import apiClient from "../../../config/apiConfig";
import toastService from "../../../services/toast-notification";
import { Order } from "../../../types";

const OrdersPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [orderResult, setOrderResult] = React.useState<Order>();

  const handleSearch = async () => {
    if (!searchTerm) return toastService.showInfoMessage("Enter an Order ID.");
    let sterilizedSearchTerm = searchTerm;
    if (searchTerm.includes("#")) {
      sterilizedSearchTerm = searchTerm.split("#")[1];
    }
    setLoading(true);
    try {
      const { data } = await apiClient.get(
        `/api/admin/order/${sterilizedSearchTerm}`,
      );
      if (data.error) {
        setLoading(false);
        toastService.showErrorMessage(data.error);
        return;
      }
      setOrderResult(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toastService.showErrorMessage(
        error.message || "ERR: Could not reach the server.",
      );
    }
  };

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
          Pending Orders
        </Typography>
        <FlexRow justifyContent="center" alignItems="center">
          <Input
            sx={{ width: { xs: 350, md: 450 }, bgcolor: "white" }}
            type="text"
            label="Search all orders by order number"
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearchButtonClick={handleSearch}
          />
        </FlexRow>
      </FlexRow>
      <FlexCol sx={{ px: 2 }}>
        {orderResult ? (
          <SingleOrderInformation {...(orderResult as Order)} />
        ) : (
          <PendingOrders trackStatus="PENDING" />
        )}
      </FlexCol>
    </Layout>
  );
};
export default OrdersPage;