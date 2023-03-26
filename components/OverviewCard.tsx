"use  client";

import React from "react";
import { SvgIcon, Typography } from "@mui/material";
import { FlexCol } from "./FlexCol";
import { FlexRow } from "./FlexRow";
import { useFetch } from "../hooks";
import { OverviewCardSkeleton } from "./skeleton/OverviewCardSkeleton";
import { formatToCurrency } from "../utils/currencyFormatter";

type Props = {
  title: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  src: string;
  isMoneyCount?: boolean;
};

export const OverviewCard = ({
  title,
  icon,
  src = "",
  isMoneyCount,
}: Props) => {
  const { data, error, fetchStatus } = useFetch(src);
  const dataItems = data[0] as unknown as { count: any };

  if (fetchStatus !== "succeeded") {
    return <OverviewCardSkeleton />;
  }

  return (
    <FlexCol
      sx={{
        width: "100%",
        height: 150,
        bgcolor: "white",
        p: 2,
        borderRadius: 2,
        justifyContent: "space-between",
      }}
    >
      <FlexRow
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ color: "secondary.main" }}>{title}</Typography>
        <div className="px-2 pb-1 bg-green-100 rounded-md">
          <SvgIcon
            component={icon}
            inheritViewBox
            sx={{ width: 20, height: 20, color: "primary.main" }}
          />
        </div>
      </FlexRow>
      <Typography
        sx={{ alignSelf: "flex-end", color: "secondary.main" }}
        variant="h5"
        fontWeight={800}
      >
        {isMoneyCount
          ? formatToCurrency(dataItems?.count || 0, "NGN")
          : dataItems?.count || 0}
      </Typography>
    </FlexCol>
  );
};
