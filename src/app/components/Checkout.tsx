"use client";

import { useCardStore } from "@/store";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default async function Checkout() {
  const cartStore = useCardStore();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cartStore.setPaymentIntent(data.paymentIntent.id);
        setClientSecret(data.paymentIntent?.client_Secret);
        console.log(data.paymentIntent);
      });
  }, [cartStore, cartStore.cart, cartStore.paymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "night",
      labels: "floating",
    },
  };

  return (
    <div>
      {clientSecret ? (
        <>
          <Elements options={options} stripe={stripePromise}>
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
          </Elements>
          <h1>Checkout</h1>
        </>
      ) : (
        <div>
          <h1>Carregando...</h1>
        </div>
      )}
    </div>
  );
}
