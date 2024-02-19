import React, { FC } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import { Container, Typography } from "@mui/material";
import Logo from "../../assets/icons/Logo";
import { UserDrop } from "../atom";
import { FlexRow } from "../FlexRow";
import { SearchBar } from "../SearchBar";
import { Cart } from "../Cart";
import { useDeviceType } from "../../hooks";

export interface IHeaderProps {
  className: string;
}

const Header: FC<IHeaderProps> = ({ className }) => {
  const deviceType = useDeviceType();
  return (
    <div className="sticky top-0 z-30 bg-white shadow pb-0.5">
      <Container disableGutters>
        <section
          className={`${className} w-full flex justify-between items-baseline px-10 py-4 space-x-3`}
        >
          <Logo className="h-7 sm:h-8 stroke-neutral-500 -ml-7 sm:-ml-16 font-extrabold w-fit" />
          {deviceType === "desktop" && <SearchBar />}
          {deviceType === "tablet" && <SearchBar />}
          <Cart />
        </section>
        <div className="mb-2.5 px-2">
          {deviceType === "mobile" && <SearchBar />}
        </div>
      </Container>
    </div>
  );
};
export default Header;
