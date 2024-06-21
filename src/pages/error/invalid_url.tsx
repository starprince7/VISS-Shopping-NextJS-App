import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { FlexCol } from "@/components";

export default function InvalidURrlPage() {
  const router = useRouter();
  const { url } = router.query;

  const message = JSON.stringify({
    error: "This link is no longer valid.",
  });

  return (
    <FlexCol
      sx={{
        alignItems: "center",
        p: 5,
      }}
    >
      <FlexCol
        sx={{
          minHeight: "90vh",
          minWidth: "80%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <Typography variant="subtitle1" className="mb-8 text-zinc-500 block">
          Forbidden!
        </Typography>
        <Typography variant="h5">
          <code>{message}</code>
        </Typography>
        <Typography
          variant="subtitle1"
          className="mt-8 text-zinc-500 italic block"
        >
          {url}
        </Typography>
        <Button
          variant="text"
          className="mt-10"
          onClick={() => router.push("/")}
        >
          Go back to login page.
        </Button>
      </FlexCol>
    </FlexCol>
  );
}
