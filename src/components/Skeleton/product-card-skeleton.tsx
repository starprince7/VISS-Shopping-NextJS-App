import { Skeleton } from "@mui/material";

import { FlexCol } from "../FlexCol";

export function ProductCardSkeleton() {
  return (
    <FlexCol
      className="shadow-sm"
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        width: "fit-content",
        minWidth: 100,
        minHeight: 390,
        maxHeight: 400,
        mb: 2,
      }}
    >
      <Skeleton
        variant="rounded"
        width={200}
        height={230}
        animation="wave"
        sx={{ bgcolor: "#E5E4E2", width: "100%" }}
      />
      <div className="p-2">
        <Skeleton
          height={14}
          width={150}
          animation="wave"
          sx={{ bgcolor: "#E5E4E2" }}
        />
        <Skeleton
          height={25}
          width={60}
          animation="wave"
          sx={{ my: 1, bgcolor: "#E5E4E2" }}
        />
        <Skeleton
          height={12}
          width={55}
          animation="wave"
          sx={{ my: 2, bgcolor: "#E5E4E2" }}
        />
      </div>
    </FlexCol>
  );
}
