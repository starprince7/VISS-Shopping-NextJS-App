import React, { FC } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import { Container, Typography } from "@mui/material";
import Logo from "../../assets/icons/Logo";
import { UserDrop } from "../atom";
import { FlexRow } from "../FlexRow";

export interface IHeaderProps {
  className: string;
}

const Header: FC<IHeaderProps> = ({ className }) => {
  return (
    <Container disableGutters>
      <section
        className={`${className} w-full flex justify-between px-10 py-4`}
      >
        <FlexRow sx={{ alignItems: "center" }}>
          <FlexRow alignItems="center">
            <Logo className="h-6 sm:h-8 stroke-neutral-500 -ml-20 sm:-ml-16 font-extrabold" />
          </FlexRow>
        </FlexRow>
        {/* <UserDrop /> */}
      </section>
    </Container>
  );
};
export default Header;
