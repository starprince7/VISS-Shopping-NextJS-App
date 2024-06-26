/**
 * Paystack payment Button component; Where ever this component is used
 * that page must make sure that the user is authenticated first before
 * loading up the page with this paystack component.
 * (Reasons):
 * To avoid any error: because this file depends on a user's session being available.
 */
import { useRouter } from "next/router";
import { PaystackButton } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

import { useSession } from "../../context/session-provider";
import { clearCart, selectCart } from "../../store/cartSlice";
import { generateId } from "../../utils/generate-id";
import { formatToCurrency } from "../../utils/currencyFormatter";
import { createOrder } from "../../helpers/create-order";

export function PaystackPaymentButton() {
  const router = useRouter();
  const session = useSession();
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const totalAmountInCart = cart.reduce((acc, cartItem) => {
    const itemTotal = cartItem.price * cartItem.quantity;
    return acc + itemTotal;
  }, 0);

  function handlePaymentSuccessAction(txInfo: any) {
    (async () => {
      const orderNo = generateId();
      const { data: orderData } = await createOrder({
        amount: totalAmountInCart,
        sumTotal: totalAmountInCart,
        customer: session?._id as any,
        items: cart,
        orderNo,
        transactionRef: txInfo.reference,
      });

      // clear cart here!
      dispatch(clearCart());
      const route = `/checkout/payment-complete?transactionId=${txInfo.reference}&orderId=${orderData.order._id}`;
      router.push(route);
    })();
  }

  const paymentCloseAction = () => {
    // Stop loader flag
    const msg = "Payment stopped!";
    alert(msg);
  };

  const config: PaystackProps = {
    currency: "NGN",
    reference: generateId({ suffix: "viss-ref" }),
    // email: session?.email as string,
    email: "Prince-tester@gmail.com" as string,
    amount: totalAmountInCart * 100, // Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  const componentProps = {
    ...config,
    text: (<PayText price={totalAmountInCart} />) as any,
    onSuccess: handlePaymentSuccessAction,
    onClose: paymentCloseAction,
  };

  return <PaystackButton {...componentProps} className="w-full" />;
}

function PayText({ price }: any) {
  return (
    <Button variant="contained" sx={{ width: "100%", my: 1 }}>
      Pay
    </Button>
  );
}
