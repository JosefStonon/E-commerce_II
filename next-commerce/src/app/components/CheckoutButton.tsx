'use client';

import { formatPrice } from "@/lib/utils";
import { useCardStore } from "@/store";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type CheckoutButtonProps = {
  totalPrice: number;
};

export default function CheckoutButton({totalPrice}: CheckoutButtonProps) {

  const router = useRouter()
  const { user } = useUser();
  const cartStore = useCardStore();

  const handleCheckout = async () => {
    if (!user) {
      cartStore.toggleCart();
      router.push('/sign-in')

      return;
    }

    cartStore.setCheckout('checkout');
  }


  return (
          <div>
            <p className="text-teal-600 font-bold">
                Total: {formatPrice(totalPrice)}
            </p>

            <button onClick={() => cartStore.setCheckout('checkout')} className="w-full rounded-md bg-teal-600 text-white py-2 mt-2">
                Finalizar Compra
            </button>
          </div>
  )
}