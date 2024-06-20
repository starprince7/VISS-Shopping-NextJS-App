import { Alert } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useRef, HTMLInputTypeAttribute } from "react";
import { Logo } from "../../../assets/icons";
import apiClient from "../../../config/apiConfig";
import toastService from "../../../services/toast-notification";
import { StorageService } from "../../../utils/helpers/storage";

export default function Home() {
  const router = useRouter();
  const { token } = router.query;
  const FormRef = useRef<HTMLFormElement>();
  const SubmitButtonRef = useRef<HTMLButtonElement>(null);

  // Product Details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const URL = JSON.stringify(`/signup/${token}`);

  // Verify sign up URL authenticity
  React.useEffect(() => {
    if (token) {
      (async function () {
        try {
          await apiClient.get(
            `/api/admin/create/verify_create_token?token=${token}`,
          );
        } catch (e) {
          if (
            e.response.status === 403 &&
            e.response.data.msg === "Verification failed"
          ) {
            toastService.showErrorMessage(e.response.statusText);
            router.push(`/error/invalid_url?url=${URL}`);
          }
        }
      })();
    }
  }, [URL, token]);

  // Submit for preview.
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setFullNameError("");
    setPasswordError("");

    if (!fullName)
      return toastService.showErrorMessage("Full Name is required.");
    if (!email) return toastService.showErrorMessage("Email is required.");
    if (!password && !confirmPassword)
      return toastService.showErrorMessage("Complete the password field.");
    if (confirmPassword !== password)
      return toastService.showErrorMessage("Passwords do not match.");

    if (!SubmitButtonRef.current) return;
    // button loading indicator
    SubmitButtonRef.current.textContent = "Please wait...";
    SubmitButtonRef.current.disabled = true;

    const ADMINISTRATOR = {
      fullName,
      email,
      password,
    };

    try {
      const { data } = await apiClient.post(
        "/api/admin/create/administrator",
        ADMINISTRATOR,
      );

      // Admin creation success
      toastService.showSuccessMessage(data.msg);

      StorageService.setAuthToken(data.auth_token);
      StorageService.setAdminId(data._id);
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 100);

      // stop button loading indicator
      SubmitButtonRef.current.textContent = "Create Account";
      SubmitButtonRef.current.disabled = false;
    } catch (e) {
      if (e.response.data.error) {
        const { email, fullName, password } = e.response.data.error;
        if (email) setEmailError(email);
        if (fullName) setFullNameError(fullName);
        if (password) setPasswordError(password);
      }
      toastService.showErrorMessage(e.response.data.error || e.message);
      SubmitButtonRef.current.textContent = "Create Account";
      SubmitButtonRef.current.disabled = false;
    }
  };

  return (
    <>
      <div className="w-full shadow text-white p-5 mb-3">
        <Logo className="h-10" />
      </div>
      <div className="container p-5 mt-10">
        <h2 className="text-3xl font-bold my-3">Admin Panel Sign up</h2>
        <p className="text-gray-800 mb-5">Viss Store Administrator Sign up.</p>

        {fullNameError && <Alert severity="error">{fullNameError}</Alert>}
        {emailError && <Alert severity="error">{emailError}</Alert>}
        {passwordError && <Alert severity="error">{passwordError}</Alert>}

        <form
          ref={FormRef as React.LegacyRef<HTMLFormElement>}
          onSubmit={handleFormSubmit}
          className="mt-5"
        >
          <div className="input-field mb-4">
            <label htmlFor="full_name" className="block text-gray-400 my-2">
              Full Name
              <input
                id="full_name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder="Your full name"
                className="input"
              />
            </label>
          </div>
          <div className="input-field mb-4">
            <label htmlFor="email" className="block text-gray-400 my-2">
              Email address
              <input
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your email"
                className="input"
              />
            </label>
          </div>
          <div className="input-field mb-4">
            <label htmlFor="password" className="block text-gray-400 my-2">
              Password
              <input
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Your admin password"
                className="input"
              />
            </label>
          </div>
          <div className="input-field mb-4">
            <label
              htmlFor="confirm_password"
              className="block text-gray-400 my-2"
            >
              Confirm Password
              <input
                id="confirm_password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="confirm admin password"
                className="input"
              />
            </label>
          </div>

          <button type="submit" ref={SubmitButtonRef} className="btn">
            Create Account
          </button>
        </form>
      </div>
    </>
  );
}
