"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";

export default function AddCart({
  name,
  id,
  image,
  unit_amount,
  quantity
}: AddCartType) {
  const cartStore = useCartStore();

  return (
    <>
      <button
        onClick={() =>
          cartStore.addProduct({
            id,
            name,
            unit_amount,
            quantity,
            image,
          } as AddCartType)
        }
        className="my-12 text-white py-2 px-6 font-medium rounded-md bg-gray-500"
      >
        Add to cart
      </button>
    </>
  );
}
