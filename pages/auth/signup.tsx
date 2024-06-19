import { Alert, Stack, Typography } from "@mui/material";
import router, { useRouter } from "next/router";
import React, { useState, useRef } from "react";

import { Logo } from "../../assets/icons";
import toastService from "../../services/toast-notification";
import Link from "next/link";

export default function signupPage() {
  const FormRef = useRef<HTMLFormElement>();
  const SubmitButtonRef = useRef<HTMLButtonElement>();
  const router = useRouter();
  const { callbackUrl } = router.query;

  // Product Details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [vError, setVError] = useState({
    email: "",
    password: "",
  });

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
    if (confirmPassword !== password)
      return toastService.showErrorMessage("Passwords are not match!");
    if (!SubmitButtonRef.current) return;

    // button loading indicator
    SubmitButtonRef.current.disabled = true;
    SubmitButtonRef.current.textContent = "Please wait...";

    const CUSTOMER = {
      fullName,
      email,
      password,
    };

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(CUSTOMER),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        if (data.validationError) setVError(data.validationError);
        else setError(data.error);
        SubmitButtonRef.current.disabled = false;
        SubmitButtonRef.current.textContent = "Log in";
        return;
      }

      // stop button loading indicator
      SubmitButtonRef.current.textContent = "Log in";
      SubmitButtonRef.current.disabled = false;
      // CUSTOMER login success
      resetFormFields();
      if (callbackUrl) router.push(callbackUrl as string);
      else router.push("/");
    } catch (e) {
      console.log("An Error Occurred trying to login an CUSTOMER :", e);

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
        <h2 className="text-3xl font-bold my-3">Sign Up, we await you!</h2>
        <p className="text-gray-800">
          Enter the following information and let us know who is shopping.
        </p>
        <br />
        {error && <Alert severity="error">{error}</Alert>}

        <form
          ref={FormRef as React.LegacyRef<HTMLFormElement>}
          onSubmit={handleFormSubmit}
          className="mt-5"
        >
          <div className="input-field mb-4">
            <label
              htmlFor="CUSTOMER title"
              className="block text-gray-400 my-2"
            >
              Full Name
            </label>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Enter your full name"
              className="input"
            />
          </div>
          <div className="input-field mb-4">
            <label
              htmlFor="CUSTOMER title"
              className="block text-gray-400 my-2"
            >
              Email Address
            </label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="input"
            />
            <Typography color="#F44336" variant="caption">
              {vError.email}
            </Typography>
          </div>
          <div className="input-field mb-4">
            <label
              htmlFor="CUSTOMER title"
              className="block text-gray-400 my-2"
            >
              Password
            </label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="input"
            />
            <Typography color="#F44336" variant="caption">
              {vError.password}
            </Typography>
          </div>
          <div className="input-field mb-4">
            <label
              htmlFor="CUSTOMER title"
              className="block text-gray-400 my-2"
            >
              Confirm Password
            </label>
            <input
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm your password"
              className="input"
            />
          </div>

          <button
            ref={SubmitButtonRef as React.LegacyRef<HTMLButtonElement>}
            className="btn"
          >
            Sign up
          </button>
          <Typography className="text-center">
            I already have an account{" "}
            <Link href="/auth/login" className="text-primary underline">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </>
  );
}
