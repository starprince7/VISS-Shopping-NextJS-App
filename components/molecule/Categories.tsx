import { Container, IconButton, Typography } from "@mui/material";
import WatchIcon from "@mui/icons-material/Watch";
import React from "react";
import { FlexRow } from "../FlexRow";
import { Category } from "../../types";

type Props = {
  categories: Category[];
};

export const Categories = ({ categories }: Props) => {
  return (
    <Container sx={{ py: 3, my: { md: 6 } }}>
      <FlexRow
        gap={3}
        sx={{ mx: "auto", flexWrap: "wrap", justifyContent: "center" }}
      >
        {categories.map(({ name }) => (
          <div className="rounded-full w-fit py-4 px-6 text-center">
            <IconButton className="bg-primary my-2">
              <WatchIcon
                sx={{ fontSize: { xs: 65, sm: 50 }, color: "white" }}
              />
            </IconButton>
            <Typography className="text-neutral-500 capitalize">
              {name}
            </Typography>
          </div>
        ))}
      </FlexRow>
    </Container>
  );
};
