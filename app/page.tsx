'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const Homepage = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={() => router.push("/login")}>Login</button>
      <button onClick={() => router.push("/signup")}>Siginin</button>
    </div>
  )
}

export default Homepage