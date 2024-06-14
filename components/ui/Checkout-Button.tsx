import { ArrowForward } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export function CheckoutButton() {
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      type="button"
      onClick={() => router.push("/checkout")}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span>Proceed to Checkout</span>
        <span style={{ alignSelf: "baseline", display: "block" }}>
          <ArrowForward fontSize="small" sx={{ zIndex: 5 }} />
        </span>
      </div>
    </Button>
  );
}
