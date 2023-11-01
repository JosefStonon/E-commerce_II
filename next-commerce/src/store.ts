import { create } from "zustand";

import { persist } from "zustand/middleware";
import { ProductType } from "./types/ProductType";

type CartState = {
  cart: ProductType[];
  addProduct: (product: ProductType) => void;
  removeProduct: (product: ProductType) => void;
  isOpen: boolean;
  toggleCart: () => void;
  onCheckout: string;
  setCheckout: (checkout: string) => void;
  paymentIntent: string,
  setPaymentIntent: (paymentIntent: string)=> void;
}

export const useCardStore = create<CartState>() (
  persist(
      (set) => ({
    cart: [],
    addProduct: (item) => set((state) => {
      const product = state.cart.find((p) => p.id === item.id);
      if (product) {
        const updateCart = state.cart.map((p) => {
          if (p.id === item.id) {
            return {
              ...p,
              quantity: p.quantity
              ? p.quantity + 1 
              : 1
            }
          }
            return p;
        })
        return { cart: updateCart }
      } else {
        return { cart: [...state.cart, { ...item, quantity: 1}]}
      }
    }),
    removeProduct: (item) => set((states) => {
      const existingProduct = states.cart.find((p) => p.id === item.id);

      if (existingProduct && existingProduct.quantity! > 1) {
        const updatedCart = states.cart.map((p) => {
          if(p.id === item.id) {
            return {
              ...p,
              quantity: p.quantity! - 1
            };
          }
          return p;
        });
        return { cart: updatedCart};
      } else {
        const filteredCart = states.cart.filter((p) => p.id !== item.id);
        return {cart: filteredCart}
      }
     
    }),
    isOpen: false,
    toggleCart: () => set((states) => ({ isOpen: !states.isOpen})),
    onCheckout: 'cart',
    setCheckout: (checkout)=> set(() => ({ onCheckout: checkout})),
    paymentIntent: '',
    setPaymentIntent: (paymentIntent) => set(() => ({paymentIntent})),
  }),
  { name: 'cart-storage' }
  )
);