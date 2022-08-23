import Head from 'next/head';
import Image from 'next/image';
import router from 'next/router'
import React, { useState, useRef, HTMLInputTypeAttribute } from 'react';

export default function Home() {
  const [selectedFile, setSelectedFile] = React.useState('');
  const [imagePreview, setImagePreview] = React.useState<string | ArrayBuffer>('');
  const FormRef = useRef<HTMLFormElement>()
  const ProductImageRef = useRef<HTMLInputElement>()
  const SubmitButtonRef = useRef<HTMLButtonElement>()

  // Product Details
  const [title, setTitle] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<string | ArrayBuffer>('')

  function resetFormFields() {
    setTitle('')
    setBrand('')
    setPrice(0)
    setCountInStock(0)
    setCategory('')
    setDescription('')
    setImage('')
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // transform file
    previewFile(file);
  };

  const handleImageSelect = () => {
    ProductImageRef.current.click()
  }

  // Image Transformation to ArrayBuffer.
  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      setImagePreview(reader.result);
      console.log("Image is now transformed! ", typeof reader.result);
      console.log("Image is now transformed! Reader Object:>> ", reader);
    };
    reader.onerror = () => alert("An error occurred while reading image file!");
  };

  // Submit for preview.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Product image is required.");

    // button loading indicator
    SubmitButtonRef.current.textContent = "Creating Product..."
    SubmitButtonRef.current.disabled = true

    let product = {
      title,
      image,
      brand,
      price,
      description,
      countInStock
    };


    try {
      const res = await fetch('/api/admin/product/create', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();

      // product creation success
      if (data.msg) {
        alert("Product created successfully")
        resetFormFields()
        router.reload()

        // stop button loading indicator
        SubmitButtonRef.current.textContent = "Create Product"
        SubmitButtonRef.current.disabled = false
      }

    }
    catch (e) {
      console.log("An Error Occurred trying to create a product :", e)

      // stop button loading indicator
      SubmitButtonRef.current.textContent = "Create Product"
      SubmitButtonRef.current.disabled = false
    }

  };

  return (
    <div className='container p-5 mt-10'>
      <h2 className="text-3xl font-bold my-3">Create Product</h2>
      <p className='text-gray-800'>Use this form to create new products</p>
      <form ref={FormRef} onSubmit={handleFormSubmit} className='mt-5'>
        <div className="image-container" onClick={handleImageSelect}>
          {
            imagePreview
              ? <img src={imagePreview} alt="Image Preview" className='w-full h-full object-contain rounded-sm' />
              : <p className='translate-y-20'>Click to add a product image</p>
          }
        </div>
        {/* **** File Input Tag Start is Hidden by default **** */}
        <input
          type="file"
          ref={ProductImageRef}
          onChange={handleFileInputChange}
          className="hidden"
        />
        {/* **** File Input Tag End is Hidden by default **** */}
        <div className="input-field mb-4">
          <label htmlFor="product title" className="block text-gray-400 my-2">Title</label>
          <input
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text" placeholder='Enter product title' className='input' />
        </div>
        <div className="input-field mb-4">
          <label htmlFor="product title" className="block text-gray-400 my-2">Brand</label>
          <input
            required
            value={brand}
            onChange={e => setBrand(e.target.value)}
            type="text" placeholder='Enter product brand' className='input' />
        </div>
        <div className="input-field mb-4">
          <label htmlFor="product title" className="block text-gray-400 my-2">Price</label>
          <input
            required
            defaultValue={price}
            onChange={e => setPrice(Number(e.target.value))}
            type="number" placeholder='Enter product price' className='input' />
        </div>
        <div className="input-field mb-4">
          <label htmlFor="product title" className="block text-gray-400 my-2">Count In Stock</label>
          <input
            required
            defaultValue={countInStock}
            onChange={e => setCountInStock(Number(e.target.value))}
            type="number" placeholder='Number of item to sell' className='input' />
        </div>
        <div className="input-field mb-4">
          <label htmlFor="product title" className="block text-gray-400 my-2">Category</label>
          <select
            required
            defaultValue={`${category ? category : 'Watch'}`}
            onChange={e => setCategory(e.target.value)}
            className='select' disabled>
            <option value="">Select</option>
            <option value="Watch">Watch</option>
            <option value="Cloth">Cloth</option>
            <option value="Computer">Computer</option>
            <option value="Accesories">Accesories</option>
          </select>
        </div>
        <div className="input-field mb-4">
          <label htmlFor="product title" className="block text-gray-400 my-2">Description</label>
          <textarea
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
            className='textarea'></textarea>
        </div>
        <button ref={SubmitButtonRef} className='btn'>Create Product</button>
      </form>
    </div>
  );
}
