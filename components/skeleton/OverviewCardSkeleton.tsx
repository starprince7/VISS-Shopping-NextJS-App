import { Skeleton } from "@mui/material";

export const OverviewCardSkeleton = () => {
  return (
    <Skeleton
      variant="rounded"
      height={150}
      animation="wave"
      sx={{ bgcolor: "#f7f7f7", width: "100%" }}
    />
  );
};
