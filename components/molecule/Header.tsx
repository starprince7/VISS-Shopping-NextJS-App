import React, { FC } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import Logo from "../../assets/icons/Logo";
import { UserDrop } from "../atom";
import { FlexRow } from "../FlexRow";
import { Typography } from "@mui/material";

export interface IHeaderProps {
  className: string;
}

const Header: FC<IHeaderProps> = ({ className }) => {
  return (
    <section className={`${className} w-full flex justify-between px-12 py-6`}>
      <FlexRow sx={{ alignItems: "center" }}>
        <FlexRow alignItems="center">
          <Logo className="h-8 stroke-neutral-500 -ml-14 font-extrabold" />
          {/* <BadgeIcon
            className="text-neutral -ml-9"
            sx={{ color: "GrayText", alignSelf: "end" }}
          /> */}
          <Typography
            variant="caption"
            color="primary"
            fontWeight={500}
            sx={{ fontSize: 9 }}
            className="-translate-y-1 -translate-x-10"
          >
            Admin
          </Typography>
        </FlexRow>
      </FlexRow>
      <UserDrop />
    </section>
  );
};
export default Header;
