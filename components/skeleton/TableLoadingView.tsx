import { Skeleton, Stack } from "@mui/material";
import { FlexCol } from "../FlexCol";
import { FlexRow } from "../FlexRow";

export const TableLoadingView = () => {
  return (
    <Stack spacing={1}>
      {new Array(6).fill("").map((_, index) => (
        <FlexRow
          key={index}
          sx={{
            px: 1,
            py: 2,
            gap: 6,
            width: "100%",
            bgcolor: "white",
            borderRadius: 2,
          }}
        >
          {new Array(6).fill("").map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              animation="pulse"
              sx={{ bgcolor: "#f7f7f7", width: "100%", fontSize: 20 }}
            />
          ))}
        </FlexRow>
      ))}
    </Stack>
  );
};
