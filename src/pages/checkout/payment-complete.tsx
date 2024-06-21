// src/Payment-complete.js
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

import Animation from "@/assets/animated-assets/success.json";

const PaymentCompleteSuccess = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-black bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <SuccessAnimation />
        <h1 className="text-2xl font-bold mb-4">Payment Successful</h1>
        <p className="text-lg">
          Your order has been received for processing and will be delivered in
          the next 2 minutes.
        </p>
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="mt-6 text-white font-bold py-2 px-4 rounded-md"
          style={{ background: "rgb(95, 206, 47)" }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

const SuccessAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: Animation,
      });

      return () => animation.destroy();
    }
    return () => {};
  }, []);

  return <div ref={ref} className="h-36 w-36 mx-auto -mt-4" />;
};

export default PaymentCompleteSuccess;
