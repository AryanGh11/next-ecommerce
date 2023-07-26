"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import { ReactNode, useEffect, useState } from "react";
import loading from "@/public/loading.json";
import { useThemeStore } from "@/store";

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydreated, setIsHydrated] = useState(false);
  const themeStore = useThemeStore();
  const [loadingTheme, setLoadingTheme] = useState("");
  //wait untill Nextjs rehydration completes
  useEffect(() => {
    setIsHydrated(true);
    if (themeStore.mode === "wireframe") {
      setLoadingTheme("#ffff");
    } else {
      setLoadingTheme("#0000");
    }
  }, []);
  return (
    <>
      {isHydreated ? (
        <body
          className="px-4 lg:px-24 font-roboto"
          data-theme={themeStore.mode}
        >
          {children}
        </body>
      ) : (
        <body className="flex-col justify-center items-center w-full h-screen">
          <Player className="w-64" autoplay loop src={loading}></Player>
          <p>Loading... ✌️</p>
        </body>
      )}
    </>
  );
}
