import { LoadingButton } from "@mui/lab";
import { InputBase, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { FlexRow, Layout } from "@/components";
import apiClient from "@/config/apiConfig";
import toastService from "@/services/toast-notification";
import { selectAdmin } from "@/store/AdminSlice/selector";

export default function CreateAdministratorPage() {
  const { admin } = useSelector(selectAdmin);
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await apiClient.post(
        "/api/admin/create/create_signup_link",
        { email, adminId: admin?._id },
      );

      setLoading(false);
      if (data.error) return;

      toastService.showSuccessMessage(data.msg);
    } catch (e) {
      setLoading(false);
      toastService.showErrorMessage(e.response.data.error || e.message);
    }
  };

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
        <form onSubmit={handleInvite}>
          <FlexRow
            justifyContent="start"
            alignItems="center"
            sx={{ mt: 2 }}
            className="space-x-2"
          >
            <InputBase
              className="border w-96 rounded-md border-neutral-400 p-2"
              placeholder="Enter address here to invite"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <LoadingButton
              loading={loading}
              type="submit"
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
        </form>
      </Paper>
    </Layout>
  );
}
