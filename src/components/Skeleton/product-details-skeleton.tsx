import { Container, Skeleton } from "@mui/material";

import { FlexRow } from "../FlexRow";
import { FlexCol } from "../FlexCol";

export const ProductDetailsSkeleton = () => {
  return (
    <Container className="md:py-24 sm:py-16 pt-2 pb-24">
      <FlexRow className="flex-col sm:flex-row sm:space-x-6">
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            bgcolor: "#E5E4E2",
            width: "100%",
            height: 550,
            display: { xs: "none", sm: "block" },
            flex: 1,
          }}
        />
        <FlexCol sx={{ flex: 1, p: { xs: 0, sm: 2 } }}>
          <div className="p-2">
            <Skeleton
              height={523}
              width={350}
              animation="wave"
              sx={{
                bgcolor: "#E5E4E2",
                display: { xs: "block", sm: "none" },
              }}
            />
            <Skeleton
              height={23}
              width={350}
              animation="wave"
              sx={{ bgcolor: "#E5E4E2" }}
            />
            <Skeleton
              height={55}
              width={180}
              animation="wave"
              sx={{ my: 1, bgcolor: "#E5E4E2" }}
            />
            <Skeleton
              height={15}
              width={95}
              animation="wave"
              sx={{ my: 2, bgcolor: "#E5E4E2" }}
            />
            <br />
            <br />
            <br />

            {new Array(5).fill("").map((_, i) => (
              <Skeleton
                key={i}
                height={33}
                animation="wave"
                sx={{ bgcolor: "#E5E4E2", width: "100%" }}
              />
            ))}
            {new Array(3).fill("").map((_, i) => (
              <Skeleton
                key={i}
                height={33}
                animation="wave"
                sx={{ bgcolor: "#E5E4E2", width: "80%" }}
              />
            ))}
            {new Array(3).fill("").map((_, i) => (
              <Skeleton
                key={i}
                height={33}
                animation="wave"
                sx={{ bgcolor: "#E5E4E2", width: "56%" }}
              />
            ))}
          </div>
        </FlexCol>
      </FlexRow>
    </Container>
  );
};
