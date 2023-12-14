'use client'

import { useCardStore } from "@/store";
import { useEffect } from "react";

export default function Checkout() {

  const cartStore = useCardStore();

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      }),
    }).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data.paymentIntent)
    })

  }, [cartStore.cart, cartStore.paymentIntent])

  return (
    <div>
      <h1>checkout</h1>
    </div>
  )
}