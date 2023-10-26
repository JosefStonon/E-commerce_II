import { create } from "zustand";

import { persist } from "zustand/middleware";
import { ProductType } from "./types/ProductType";
import Product from "./app/components/AddCart";

type CartState = {
  cart: ProductType[];
  addProduct: (product: ProductType) => void;
  //removeProduct: (productId: string) => void;
  isOpen: boolean;
  toggleCart: () => void;
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
    isOpen: false,
    toggleCart: () => set((state) => ({ isOpen: !state.isOpen}))
  }),
  { name: 'cart-storage' }
  )
);