import { Box, Button, InputBase, Typography } from "@mui/material";
import { Add as AddIcon, AddBox as AddBoxIcon } from "@mui/icons-material";
import React from "react";
import { CustomInput } from "./atom/CustomInput";
import { FlexRow } from "./FlexRow";

type Props = {
  handleFormSubmission: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const AddProductForm = ({ handleFormSubmission }: Props) => {
  return (
    <Box sx={{ width: { xs: "80%", sm: 400 }, px: 3, pt: "10vh", pb: "3rem" }}>
      {/* <Typography variant="h4">Add Product</Typography> */}
      <form onSubmit={handleFormSubmission}>
        <CustomInput
          title="product title"
          //   placeholder="Enter product title..."
        />
        <CustomInput title="Brand name" />
        <CustomInput title="Price" type="number" />
        <CustomInput title="Count in stock" type="number" />
        <CustomInput title="Category" options={["s", "e"]} value={"s"} />
        <CustomInput title="product description" textArea />

        {/* Image File Drop Zone Start */}
        <FlexRow
          sx={{
            justifyContent: "center",
            alignItems: "center",
            border: "solid 2px #CFCFCF",
            borderRadius: 3,
            borderStyle: "dashed",
            height: 200,
            bgcolor: "#F3F3F3",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography>Click or drop Image File</Typography>
            <Typography>800 x 800</Typography>
            <AddIcon />
          </Box>
        </FlexRow>
        {/* Image File Drop Zone End. */}

        <FlexRow justifyContent="center" sx={{ my: 3 }}>
          <Button /* endIcon={<AddBoxIcon />} */ type="submit">
            <Typography>Create Product</Typography>
          </Button>
        </FlexRow>
      </form>
    </Box>
  );
};
