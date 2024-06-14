import { Box, Skeleton } from "@mui/material";

// Skeleton Component
function CartItemLoadingSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      gap={2}
    >
      <Skeleton
        animation="pulse"
        sx={{ backgroundColor: "#E5E4E2", height: 80, width: "80px" }}
      />
      <div style={{ width: "100%" }}>
        <Skeleton
          animation="pulse"
          sx={{ backgroundColor: "#E5E4E2", height: 30, width: "80%" }}
        />
        <Skeleton
          animation="pulse"
          sx={{ backgroundColor: "#E5E4E2", height: 30, width: "100%" }}
        />
      </div>
    </Box>
  );
}

export default CartItemLoadingSkeleton;
