import React from "react";
import { NextPage } from "next";
import { Button, Typography } from "@mui/material";

import { Layout } from "../../../components/molecule";
import { FlexRow, Input } from "../../../components";
import Customers from "../../../components/molecule/Customers";
import { CustomerType } from "../../../types";
import toastService from "../../../services/toast-notification";
import apiClient from "../../../config/apiConfig";
import { SingleCustomerInformation } from "../../../components/SingleCustomerInformation";
import { SearchIconLoader } from "../../../components/SearchLoader";

const CustomersPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [customerResult, setCustomerResult] = React.useState<CustomerType>();

  const handleSearch = async () => {
    if (!searchTerm)
      return toastService.showInfoMessage("Enter a customer's email address.");

    setLoading(true);
    try {
      const { data } = await apiClient.get(
        `/api/admin/customers/${searchTerm}`,
      );
      if (data.error) {
        setLoading(false);
        toastService.showErrorMessage(data.error);
        return;
      }
      setCustomerResult(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toastService.showErrorMessage(
        e.response.data.error ||
        e.message ||
        "Network Error! could not reach the server.",
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
          Customers
        </Typography>
        <FlexRow justifyContent="center" alignItems="center">
          <Input
            sx={{ width: { xs: 350, md: 450 }, bgcolor: "white" }}
            type="text"
            label="Search customer by email address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearchButtonClick={handleSearch}
          />
        </FlexRow>
      </FlexRow>
      <FlexRow sx={{ px: 2, position: "relative" }}>
        {" "}
        {/* Always add the position relative CSS to work with search loader animation. */}
        <SearchIconLoader loading={loading} />
        {customerResult ? (
          <SingleCustomerInformation
            {...(customerResult as CustomerType)}
            handleClose={() => {
              setCustomerResult(undefined);
              setSearchTerm("");
            }}
          />
        ) : (
          <Customers />
        )}
      </FlexRow>
    </Layout>
  );
};
export default CustomersPage;
