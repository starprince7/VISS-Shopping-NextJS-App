import { Skeleton } from "@mui/material";

export const OverviewCardSkeleton = () => {
  return (
    <Skeleton
      variant="rounded"
      height={150}
      animation="wave"
      sx={{ bgcolor: "#E5E4E2", width: "100%" }}
    />
  );
};
