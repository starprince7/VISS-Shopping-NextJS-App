import Link from "next/link";
import { Alert, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useRef } from "react";

import { Logo } from "../../assets/icons";
import toastService from "../../services/toast-notification";
import { useSession } from "../../context/session-provider";

export default function LoginPage() {
  const FormRef = useRef<HTMLFormElement>();
  const SubmitButtonRef = useRef<HTMLButtonElement>();
  const router = useRouter();
  const { callbackUrl } = router.query;

  // sessiom
  const session = useSession();
  console.log("Current session:", session);

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

    const CUSTOMER = {
      email,
      password,
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(CUSTOMER),
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
        <h2 className="text-3xl font-bold my-3">
          Welcome back, please sign in
        </h2>
        <p className="text-gray-800">
          We are waiting, quickly sign in to resume shopping.
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
              placeholder="Your admin password"
              className="input"
            />
          </div>

          <button
            type="button"
            ref={SubmitButtonRef as React.LegacyRef<HTMLButtonElement>}
            className="btn"
          >
            Sign in
          </button>
          <Typography className="text-center">
            I don&apos;t have an account{" "}
            <Link href="/auth/signup" className="text-primary underline">
              Sign Up
            </Link>
          </Typography>
        </form>
      </div>
    </>
  );
}
