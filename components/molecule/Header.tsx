import React, { FC } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import Logo from "../../assets/icons/Logo";
import { UserDrop } from "../atom";
import { FlexRow } from "../FlexRow";

export interface IHeaderProps {
  className: string;
}

const Header: FC<IHeaderProps> = ({ className }) => {
  return (
    <section className={`${className} w-full flex justify-between px-12 py-6`}>
      <FlexRow sx={{ alignItems: "center" }}>
        <h4 className="text-2xl font-semibold text-neutral-300">VissAdmin</h4>
        <BadgeIcon
          className="text-neutral"
          sx={{ color: "GrayText", alignSelf: "end" }}
        />
      </FlexRow>
      {/* <Logo className="h-4 font-extrabold" /> */}
      <UserDrop />
    </section>
  );
};
export default Header;
