"use client";

import { useCartStore } from "@/store";
import { AddCartType } from "@/types/AddCartType";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Product({
  name,
  image,
  unit_amount,
  id,
  quantity,
  description,
  metadata,
}: AddCartType) {
  const { features } = metadata;
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);
  const handleAdded = () => {
    cartStore.addProduct({
      id,
      name,
      unit_amount,
      quantity,
      image,
    } as AddCartType);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };
  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, id, description, features },
      }}
    >
      <div className="p-4 bg-secondary rounded-2xl">
        <Image
          src={image}
          alt={name}
          width={800}
          height={800}
          className="w-full aspect-square object-cover rounded-lg"
          priority={true}
        ></Image>
        <div className="flex justify-between items-center font-bold pt-4">
          <div>
            <h1 className="text-sm">{name}</h1>
            <h2 className="text-sm text-primary">
              {unit_amount && formatPrice(unit_amount)}
            </h2>
          </div>
          <Link href={"/"}>
            <button
              disabled={added}
              onClick={handleAdded}
              className="btn btn-primary text-base-100 text-xs"
            >
              {added && <span>Adding to cart... 🥳</span>}
              {!added && <span>Add to cart</span>}
            </button>
          </Link>
        </div>
      </div>
    </Link>
  );
}
