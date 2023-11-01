import { useEffect } from "react";
import { useCardStore } from "@/store";

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
    })

  }, [cartStore.cart, cartStore.paymentIntent])

  return (
    <div>
      <h1>checkout</h1>
    </div>
  )
}