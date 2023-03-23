import Head from "next/head";
import Image from "next/image";
import router from "next/router";
import React, { useState, useRef, HTMLInputTypeAttribute } from "react";
import { Logo } from "../assets/icons";
import useCategories from "../hooks/categories";
import toastService from "../services/toast-notification";
import { StorageService } from "../utils/helpers/storage";

export default function Home() {
  const FormRef = useRef<HTMLFormElement>();
  const SubmitButtonRef = useRef<HTMLButtonElement>();

  // Product Details
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function resetFormFields() {
    setEmail("");
    setPassword("");
  }

  // Submit for preview.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email)
      return toastService.showErrorMessage("Email address is required.");
    if (!password)
      return toastService.showErrorMessage("Password is required.");
    if (!SubmitButtonRef.current) return;

    // button loading indicator
    SubmitButtonRef.current.textContent = "Please wait...";
    SubmitButtonRef.current.disabled = true;

    const ADMIN = {
      email,
      password,
    };

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify(ADMIN),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // ADMIN login success
      if (data._id) {
        StorageService.setAuthToken(data.auth_token);
        StorageService.setAdminId(data._id);
        resetFormFields();
        router.push("/admin/dashboard");

        // stop button loading indicator
        SubmitButtonRef.current.textContent = "Log in";
        SubmitButtonRef.current.disabled = false;
      }
    } catch (e) {
      console.log("An Error Occurred trying to create a ADMIN :", e);

      // stop button loading indicator
      SubmitButtonRef.current.textContent = "Log in";
      SubmitButtonRef.current.disabled = false;
    }
  };

  return (
    <>
      <div className="w-full shadow text-white p-5 mb-3">
        <Logo className="h-10" />
      </div>
      <div className="container p-5 mt-10">
        <h2 className="text-3xl font-bold my-3">Admin Panel Login</h2>
        <p className="text-gray-800">
          Only administrators can access this portal.
        </p>

        <form
          ref={FormRef as React.LegacyRef<HTMLFormElement>}
          onSubmit={handleFormSubmit}
          className="mt-5"
        >
          <div className="input-field mb-4">
            <label htmlFor="ADMIN title" className="block text-gray-400 my-2">
              Email address
            </label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your email"
              className="input"
            />
          </div>
          <div className="input-field mb-4">
            <label htmlFor="ADMIN title" className="block text-gray-400 my-2">
              Password
            </label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Your admin password"
              className="input"
            />
          </div>

          <button
            ref={SubmitButtonRef as React.LegacyRef<HTMLButtonElement>}
            className="btn"
          >
            Log in
          </button>
        </form>
      </div>
    </>
  );
}
