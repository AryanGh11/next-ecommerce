"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/PriceFormat";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import basket from "@/public/cart.png";
import { AddCartType } from "@/types/AddCartType";
import { motion, AnimatePresence } from "framer-motion";
import Checkout from "./Checkout";
import OrderConfirmed from "./OrderConfirmed";

export default function Cart() {
  const cartStore = useCartStore();

  //Total price
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black_rgba"
    >
      {/* Cart */}
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-base-300 absolute right-0 top-0 h-screen p-12 overflow-y-scroll w-full lg:w-2/5"
      >
        {cartStore.onCheckout === "cart" && (
          <button
            onClick={() => cartStore.toggleCart()}
            className="text-sm font-bold pb-12"
          >
            Back to store 😁
          </button>
        )}
        {cartStore.onCheckout === "checkout" && (
          <button
            onClick={() => cartStore.setCheckout("cart")}
            className="text-sm font-bold pb-12"
          >
            Check your cart 🛒
          </button>
        )}
        {/* Cart Items */}
        {cartStore.onCheckout === "cart" && (
          <>
            {cartStore.cart.map((item) => (
              <motion.div
                layout
                key={item.id}
                className="flex items-center justify-between p-4 bg-secondary my-4 rounded-lg pr-8"
              >
                <div className="flex gap-4 items-center">
                  <Image
                    className="rounded-md h-24 w-24 object-cover"
                    src={item.image}
                    alt={item.name}
                    width={500}
                    height={500}
                  />
                  <div className="flex flex-col gap-4">
                    <h2>{item.name}</h2>
                    {/* update quantity of a product */}
                    <div className="flex gap-4 items-center justify-start">
                      <h2>Quantity: {item.quantity}</h2>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            cartStore.removedProduct({
                              id: item.id,
                              image: item.image,
                              name: item.name,
                              unit_amount: item.unit_amount,
                              quantity: item.quantity,
                            } as AddCartType)
                          }
                        >
                          <IoMdRemove />
                        </button>
                        <button
                          onClick={() =>
                            cartStore.addProduct({
                              id: item.id,
                              image: item.image,
                              name: item.name,
                              unit_amount: item.unit_amount,
                              quantity: item.quantity,
                            } as AddCartType)
                          }
                        >
                          <IoMdAdd />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-lg font-bold text-primary">
                  {item.unit_amount && formatPrice(item.unit_amount)}
                </p>
              </motion.div>
            ))}
          </>
        )}
        {/* Checkout and total */}
        {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (
          <motion.div layout>
            <p>Total: {formatPrice(totalPrice)}</p>
            <button
              onClick={() => cartStore.setCheckout("checkout")}
              className="py-2 mt-4 bg-primary w-full rounded-md text-base-100"
            >
              Checkout
            </button>
          </motion.div>
        ) : null}
        {/* Checkout form */}
        {cartStore.onCheckout === "checkout" && <Checkout />}
        {cartStore.onCheckout === "success" && <OrderConfirmed />}

        {/* When cart is empty! */}
        <AnimatePresence>
          {!cartStore.cart.length && cartStore.onCheckout === "cart" && (
            <motion.div
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75"
            >
              <h1>Uhhh ohhh...It's empty😅</h1>
              <Image src={basket} alt="empty cart" width={200} height={200} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
