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
import { SearchIconLoader } from "../../../components/SearchLoader";

const OrdersPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [orderResult, setOrderResult] = React.useState<Order>();

  const handleSearch = async () => {
    if (!searchTerm) return toastService.showInfoMessage("Enter an Order ID.");
    let sterilizedSearchTerm = searchTerm;
    if (searchTerm.includes("#")) {
      const [hash, val] = searchTerm.split("#");
      sterilizedSearchTerm = val;
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
        error.message || "Network Error! Could not reach the server.",
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearchButtonClick={handleSearch}
          />
        </FlexRow>
      </FlexRow>
      <FlexCol sx={{ px: 2, position: "relative" }}>
        {" "}
        {/* Always add the position relative CSS to work with search loader animation. */}
        <SearchIconLoader loading={loading} />
        {orderResult ? (
          <SingleOrderInformation
            {...(orderResult as Order)}
            handleClose={() => {
              setOrderResult(undefined);
              setSearchTerm("");
            }}
          />
        ) : (
          <PendingOrders trackStatus="PENDING" />
        )}
      </FlexCol>
    </Layout>
  );
};
export default OrdersPage;
