"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dance from "@/public/dance.gif";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function OrderConfirmed() {
  const cartStore = useCartStore();
  useEffect(() => {
    cartStore.setPaymentIntent("");
    cartStore.clearCart();
  }, []);
  const checkoutOrder = () => {
    setTimeout(() => {
      cartStore.setCheckout("cart");
    }, 1000);
    cartStore.toggleCart();
  };
  return (
    <motion.div
      className="flex-row items-center justify-center my-12"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="p-12 rounded-md text-center flex-col items-center justify-center gap-12">
        <h1 className="text-xl font-bold">Your order has been placed 😍</h1>
        <h2 className="text-sm my-4">Check your email for the receipt</h2>
        <Image src={dance} className="max-w-64 py-8 rounded-xl" alt="dancing kid" />
        <div className="flex justify-center align-center gap-8">
          <Link href={"/dashboard"} onClick={checkoutOrder}>
            <button className="hover:bg-gray-100 h-12 rounded-md font-bold w-48">Check your order</button>
          </Link>
          <button className="hover:bg-gray-100 h-12 rounded-md font-bold w-48" onClick={checkoutOrder}>
            Ok
          </button>
        </div>
      </div>
    </motion.div>
  );
}
