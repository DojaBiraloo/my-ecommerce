'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface StoredUser {
  token: string;
  username?: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<StoredUser | null>(null);
    const router = useRouter();

    useEffect(() =>{
        const data = localStorage.getItem('user');
       

         if (!data) {
      router.push('/login');
      return;
    }
     setUser(JSON.parse(data))

    },[router])
      if (!user) return null;
  return (
    <div>
        <h1>This is a dashboard.</h1>
        <h1>Welcome{user.username}</h1>

        <button onClick={() => router.push("/products")}>Products Page</button>
    </div>
  )
}

export default Dashboard