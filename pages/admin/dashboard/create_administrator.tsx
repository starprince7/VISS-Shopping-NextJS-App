import { LoadingButton } from "@mui/lab";
import { InputBase, Paper, Typography } from "@mui/material";
import React from "react";
import { FlexRow, Input, Layout } from "../../../components";
import { SearchIconLoader } from "../../../components/SearchLoader";

export default function CreateAdministratorPage() {
  const [query, setQuery] = React.useState("");

  return (
    <Layout className="bg-background px-3">
      <FlexRow
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          my: 1,
        }}
      >
        <Typography variant="h4" fontWeight={600} color="secondary.main">
          Create Administrator Account
        </Typography>
      </FlexRow>
      <Paper className="px-5 py-10">
        <Typography variant="subtitle1">Enter an email address.</Typography>
        <Typography variant="caption" color="secondary.main">
          You can use this interface to generate an admin sign up link.
        </Typography>
        <FlexRow
          justifyContent="start"
          alignItems="center"
          sx={{ mt: 2 }}
          className="space-x-2"
        >
          <InputBase
            className="border w-96 rounded-md border-neutral-400 p-2"
            placeholder="Enter address here to invite"
          />
          <LoadingButton
            sx={{
              p: 1.6,
              bgcolor: "#89A67E",
              color: "white",
              "&:hover": { bgcolor: "#89A67E" },
            }}
          >
            Invite
          </LoadingButton>
        </FlexRow>
      </Paper>
    </Layout>
  );
}
