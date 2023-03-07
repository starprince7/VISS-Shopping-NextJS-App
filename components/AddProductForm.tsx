import { Box, Button, InputBase, Typography } from "@mui/material";
import { Add as AddIcon, AddBox as AddBoxIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import React from "react";

import { CustomInput } from "./atom/CustomInput";
import { FlexRow } from "./FlexRow";
import useCategories from "../hooks/categories";

interface Props {
  categories: ReturnType<typeof useCategories>;
  loading: boolean;
  image: string;
  title: string;
  brand: string;
  price: number;
  weight: number;
  countInStock: number;
  category: string;
  description: string;
  setImage: (arg: string) => void;
  setTitle: (arg: string) => void;
  setBrand: (arg: string) => void;
  setPrice: (arg: number) => void;
  setWeight: (arg: number) => void;
  setCountInStock: (arg: number) => void;
  setCategory: (arg: string) => void;
  setDescription: (arg: string) => void;
  setOpen: (arg: boolean) => void;
  handleFormSubmission: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const AddProductForm = ({
  handleFormSubmission,
  categories,
  loading,
  image,
  title,
  brand,
  price,
  weight,
  countInStock,
  category,
  description,
  setImage,
  setTitle,
  setBrand,
  setPrice,
  setWeight,
  setCountInStock,
  setCategory,
  setDescription,
  setOpen,
}: Props) => {
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const categoryNames = categories.map((c) => c.name);

  const handleImageChange = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    readFile(file);
  };

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    readFile(file);
  }

  const readFile = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (event) {
      setImage(reader.result as string);
    };
  };

  return (
    <Box
      sx={{
        width: { xs: "80%", sm: 400, lg: 500 },
        px: 3,
        pt: "10vh",
        pb: "3rem",
      }}
    >
      <form onSubmit={handleFormSubmission}>
        <CustomInput
          title="product title"
          value={title}
          placeholder="e.g Apple Watch Series 6"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <CustomInput
          title="Brand name"
          value={brand}
          placeholder="e.g Apple.inc"
          onChange={(e) => setBrand(e.target.value)}
          required
        />
        <CustomInput
          title="Price (NGN)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <CustomInput
          title="Count in stock"
          type="number"
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}
          required
        />
        <CustomInput
          title="Category"
          options={categoryNames}
          value={category || "watch"}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <CustomInput
          title="Product description"
          textArea
          value={description}
          placeholder="Write a short description about this product."
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Image File Drop Zone Start */}
        <input
          type="file"
          ref={imageInputRef}
          onChange={handleImageChange}
          onClick={(e) => e.stopPropagation()}
          className="hidden"
        />
        <FlexRow
          component="button"
          onClick={(e) => {
            e.stopPropagation();
            imageInputRef.current?.click();
          }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          sx={{
            mx: "auto",
            justifyContent: "center",
            alignItems: "center",
            border: "solid 2px #CFCFCF",
            borderRadius: 3,
            borderStyle: "dashed",
            height: 600,
            maxHeight: { xs: 200, lg: 300 },
            bgcolor: "#F3F3F3",
            width: "250px",
            overflow: "hidden",
          }}
        >
          {image ? (
            <img
              src={image as unknown as string}
              alt="product image"
              className="object-contain"
            />
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography>Click or drop Image File</Typography>
              <Typography>800 x 800</Typography>
              <AddIcon />
            </Box>
          )}
        </FlexRow>
        {/* Image File Drop Zone End. */}

        <FlexRow justifyContent="center" sx={{ my: 3 }}>
          <LoadingButton
            className="bg-[#89A67E] hover:bg-[#89A67E] text-zinc-50"
            loading={loading}
            type="submit"
          >
            <Typography>Create Product</Typography>
          </LoadingButton>
        </FlexRow>
      </form>
    </Box>
  );
};
