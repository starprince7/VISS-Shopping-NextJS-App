import React from "react";
import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { Box, Button, Typography, Drawer } from "@mui/material";
import { AddBox as AddIcon } from "@mui/icons-material";

import { Layout, Products } from "../../../components/molecule";
import { FlexRow, Input } from "../../../components";
import { AddProductForm } from "../../../components/AddProductForm";
import useCategories from "../../../hooks/categories";
import toastService from "../../../services/toast-notification";
import apiClient from "../../../config/apiConfig";
import { fetchProducts } from "../../../store";
import { AnyAction } from "@reduxjs/toolkit";

const ProductsPage: NextPage = () => {
  const dispatch = useDispatch();
  const categories = useCategories();
  const [open, setOpen] = React.useState(false);

  const [image, setImage] = React.useState<ArrayBuffer | string>();
  const [title, setTitle] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [countInStock, setCountInStock] = React.useState(0);
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function resetFormFields() {
    setTitle("");
    setBrand("");
    setPrice(0);
    setWeight(0);
    setCountInStock(0);
    setCategory("");
    setDescription("");
    setImage("");
  }

  const createProduct = async (e) => {
    e.preventDefault();
    if (!image)
      return toastService.showInfoMessage("Product image is required.");
    // Async form submission will happen here.
    setLoading(true);
    const product = {
      title,
      image,
      brand,
      price,
      weight,
      description,
      countInStock,
    };
    try {
      const response = await apiClient.post(
        "/api/admin/product/create",
        product,
      );
      const data = response.data;
      if (data.error) {
        toastService.showErrorMessage(data.error);
        return;
      }
      // product creation success
      if (data.msg) {
        toastService.showSuccessMessage("Product created successfully");
        resetFormFields();
        dispatch(fetchProducts({ page: 1 }) as unknown as AnyAction);
        setLoading(false);
        setTimeout(() => {
          setOpen(false);
        }, 1000);
      }
    } catch (e) {
      toastService.showErrorMessage(e.response.data.error || e.message);
      setLoading(false);
      console.log("Err: creating a product : ", e);
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
          Products
        </Typography>
        <FlexRow
          justifyContent="center"
          alignItems="center"
          sx={{ pr: 3, pt: 1 }}
        >
          {/* <Input
            sx={{ width: { xs: 350, md: 450 }, bgcolor: "white" }}
            type="text"
            label="Search products..."
          /> */}
          <Button
            disableElevation
            variant="contained"
            color="primary"
            sx={{ color: "white", fontSize: "13px", py: 1.8 }}
            style={{ background: "#89A67E" }}
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add Product
          </Button>
        </FlexRow>
      </FlexRow>
      <Box sx={{ width: "100%", height: "75vh", p: 3, overflowY: "scroll" }}>
        <Products />
      </Box>
      <Drawer
        open={open}
        // variant={open ? "permanent" : "temporary"}
        anchor="right"
        onClose={() => setOpen(false)}
      >
        <AddProductForm
          loading={loading}
          image={image as string}
          title={title}
          brand={brand}
          price={price}
          weight={weight}
          countInStock={countInStock}
          category={category}
          description={description}
          setImage={setImage}
          setTitle={setTitle}
          setBrand={setBrand}
          setPrice={setPrice}
          setWeight={setWeight}
          setCountInStock={setCountInStock}
          setCategory={setCategory}
          setDescription={setDescription}
          setOpen={setOpen}
          handleFormSubmission={createProduct}
          categories={categories}
        />
      </Drawer>
    </Layout>
  );
};
export default ProductsPage;
