import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import order from "@/public/order.json";

export default function OrderAnimation() {
  return (
    <div className="flex-col text-center h-full item-center justify-center">
      <Player className="w-64" autoplay loop src={order}></Player>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Prepping your order 🔥
      </motion.h1>
    </div>
  );
}
