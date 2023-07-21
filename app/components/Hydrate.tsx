'use client'

import { ReactNode, useEffect, useState } from "react"

export default function Hydrate({children}: {children: ReactNode}) {
  const [isHydreated, setIsHydrated] = useState(false)

  //wait untill Nextjs rehydration completes
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return (
    <>
    {isHydreated ? <>{children}</> : <div>Loading...</div>}
    </>
  )
}