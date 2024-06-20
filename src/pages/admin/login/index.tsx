import { Alert } from "@mui/material";
import router from "next/router";
import React, { useState, useRef } from "react";

import { Logo } from "../../../assets/icons";
import toastService from "../../../services/toast-notification";
import { StorageService } from "../../../utils/helpers/storage";

export default function LoginAdminPage() {
  const FormRef = useRef<HTMLFormElement>();
  const SubmitButtonRef = useRef<HTMLButtonElement>();

  // Product Details
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function resetFormFields() {
    setEmail("");
    setPassword("");
  }

  // Submit for preview.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email)
      return toastService.showErrorMessage("Email address is required.");
    if (!password)
      return toastService.showErrorMessage("Password is required.");
    if (!SubmitButtonRef.current) return;

    // button loading indicator
    SubmitButtonRef.current.disabled = true;
    SubmitButtonRef.current.textContent = "Please wait...";

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

      if (data.error) {
        setError(data.error);
        SubmitButtonRef.current.disabled = false;
        SubmitButtonRef.current.textContent = "Log in";
      }

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
      console.log("An Error Occurred trying to login an ADMIN :", e);

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
        <br />
        {error && <Alert severity="error">{error}</Alert>}

        <form
          ref={FormRef as React.LegacyRef<HTMLFormElement>}
          onSubmit={handleFormSubmit}
          className="mt-5"
        >
          <div className="input-field mb-4">
            <label htmlFor="email_admin" className="block text-gray-400 my-2">
              Email address
            </label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email_admin" // Add this line
              placeholder="Your email"
              className="input"
            />
          </div>

          <div className="input-field mb-4">
            <label htmlFor="password" className="block text-gray-400 my-2">
              Password
            </label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Your admin password"
              className="input"
            />
          </div>

          <button
            type="submit"
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
