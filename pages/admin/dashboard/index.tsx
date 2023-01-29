import React from "react";
import { NextPage } from "next";
import { Typography, Button } from "@mui/material";
import {
  AddBox as AddBoxIcon,
  PieChart as PieChartIcon,
  ListAlt as ListAltIcon,
  Groups as GroupsIcon,
} from "@mui/icons-material";

import {
  Layout,
  FlexRow,
  Input,
  OverviewCard,
  FlexCol,
} from "../../../components";
import RecentOrders from "../../../components/RecentOrders";

const DashboardPage: NextPage = () => {
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
          Overview
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
            startIcon={<AddBoxIcon />}
          >
            Add Product
          </Button>
        </FlexRow>
      </FlexRow>
      <FlexRow sx={{ px: 2, my: 3, gap: 3 }}>
        <OverviewCard
          title="Total Sales"
          icon={PieChartIcon}
          src="/api/admin/overview/total_sales"
          isMoneyCount
        />
        <OverviewCard
          title="Orders"
          icon={ListAltIcon}
          src="/api/admin/overview/total_orders"
        />
        <OverviewCard
          title="Customers"
          icon={GroupsIcon}
          src="/api/admin/overview/total_customers"
        />
      </FlexRow>
      <FlexCol sx={{ px: 2, my: 4 }}>
        <Typography
          variant="subtitle1"
          color="secondary"
          sx={{ fontWeight: 600, mb: 0.5 }}
        >
          Recent Orders
        </Typography>
        <RecentOrders />
      </FlexCol>
    </Layout>
  );
};
export default DashboardPage;
