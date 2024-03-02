import { Container, Grid } from "@mui/material";
import React from "react";
import { FlexCol } from "../FlexCol";
import { Logo } from "../../assets/icons";
import { FlexRow } from "../FlexRow";

export const Footer = () => {
  return (
    <footer>
      <div className="bg-[#003868] p-5 sm:p-10 text-neutral-100">
        <Container>
          <FlexRow
            justifyContent="space-between"
            alignItems="center"
            className="mb-16 mt-8 space-y-4"
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            <Logo className="h-9 sm:h-10 stroke-neutral-500 font-extrabold sm:-ml-32" />
            <FlexCol className="text-center">
              <div>Terms of Service</div>
              <div>Privacy Policy</div>
            </FlexCol>
            <div>
              <b>Contact</b>
            </div>
          </FlexRow>
          <FlexRow
            justifyContent="center"
            alignItems="center"
            sx={{ textAlign: "center" }}
          >
            <div>© 2023 Viss Store all right reserved.</div>
          </FlexRow>
        </Container>
      </div>
    </footer>
  );
};
