import React from "react";
import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { Box, Button, Typography, Drawer } from "@mui/material";
import { AddBox as AddIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import { Layout, Products } from "../../../components/molecule";
import { CustomInput, FlexRow, Input } from "../../../components";
import { useCategories } from "../../../hooks";
import toastService from "../../../services/toast-notification";
import apiClient from "../../../config/apiConfig";
import { fetchProducts } from "../../../store/productsSlice/reducer";

interface ProductFormContextProps {
  setImage: (arg: string) => void;
  setTitle: (arg: string) => void;
  setBrand: (arg: string) => void;
  setPrice: (arg: number) => void;
  setWeight: (arg: number) => void;
  setCountInStock: (arg: number) => void;
  setCategory: (arg: string) => void;
  setDescription: (arg: string) => void;
  setOpen: (arg: boolean) => void;
  setLoading: (arg: boolean) => void;
  handleFormSubmission: (e: React.FormEvent<HTMLFormElement>) => void;
}
export const ProductFormContext = React.createContext(
  {} as ProductFormContextProps,
);

const ProductsPage: NextPage = () => {
  const dispatch = useDispatch();
  const { data: categories } = useCategories();
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

  const createProduct = React.useCallback(
    async (e) => {
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
        const { data } = response;
        if (data.error) {
          toastService.showErrorMessage(data.error);
          return;
        }
        // product creation success
        if (data.msg) {
          toastService.showSuccessMessage("Product added successfully");
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
      }
    },
    [brand, countInStock, description, dispatch, image, price, title, weight],
  );

  const contextValues: ProductFormContextProps = React.useMemo(
    () => ({
      setImage,
      setTitle,
      setBrand,
      setPrice,
      setCategory,
      setWeight,
      setCountInStock,
      setDescription,
      setLoading,
      setOpen,
      handleFormSubmission: createProduct,
    }),
    [
      setImage,
      setTitle,
      setBrand,
      setPrice,
      setCategory,
      setWeight,
      setCountInStock,
      setDescription,
      setLoading,
      setOpen,
      createProduct,
    ],
  );

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

  return (
    <Layout className="bg-background px-3">
      <FlexRow
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          // my: 1,
        }}
      >
        <Typography variant="h4" fontWeight={600} color="secondary.main">
          Products
        </Typography>
        <FlexRow justifyContent="center" alignItems="center" sx={{ pr: 3 }}>
          {/* <Input
            sx={{ width: { xs: 350, md: 450 }, bgcolor: "white" }}
            type="text"
            label="Search products..."
          /> */}
          <Button
            disableElevation
            variant="contained"
            color="primary"
            sx={{ color: "white", fontSize: "13px", py: 1.5, mt: 1.5 }}
            style={{ background: "#89A67E" }}
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add Product
          </Button>
        </FlexRow>
      </FlexRow>
      <Box sx={{ p: 3 }}>
        <Products />
      </Box>
      <Drawer
        open={open}
        // variant={open ? "permanent" : "temporary"}
        anchor="right"
        onClose={() => setOpen(false)}
      >
        <ProductFormContext.Provider value={contextValues}>
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
            categories={categories}
          />
        </ProductFormContext.Provider>
      </Drawer>
    </Layout>
  );
};
export default ProductsPage;

/* *************************************************************************************************************************************************************************** 
    --- AddProductForm Component ---
   *************************************************************************************************************************************************************************** 
*/

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
}

const AddProductForm = ({
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
}: Props) => {
  const {
    setImage,
    setTitle,
    setBrand,
    setPrice,
    setWeight,
    setCountInStock,
    setCategory,
    setDescription,
    setOpen,
    handleFormSubmission,
  } = React.useContext(ProductFormContext);
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const categoryNames = categories.map((c) => c.name);

  const handleImageChange = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    readFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    readFile(file);
  };

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
            <img src={image} alt="product" className="object-contain" />
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography>Click or drag image here</Typography>
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
            sx={{ px: 5, py: 1 }}
          >
            <Typography className="font-bold text-sm p-1">
              Add Product
            </Typography>
          </LoadingButton>
        </FlexRow>
      </form>
    </Box>
  );
};
