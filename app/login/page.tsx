'use client'

import React, { useState } from 'react';
import {getUsers, loginUser} from '../lib/api'
import { useRouter } from 'next/navigation';


const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const router = useRouter();

    const handleLogin = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const data = await loginUser(username, password);
            localStorage.setItem('user', JSON.stringify(data));

          
            router.push("/dashboard");
        }catch(err){
             setError(err instanceof Error ? err.message : "Something went wrong");
        }finally{
            setLoading(false);
        }
    }
  return (
    <div>
        <h1>Login </h1>
        <form onSubmit={handleLogin} className='flex flex-col w-xl gap-4 items-center justify-between'>
            <input type="username" placeholder='Enter username' value={username} className='border p-3' onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder='Enter password' value={password} className='border p-3' onChange={(e) => setPassword(e.target.value)} />
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            <button className='border p-4' type='submit' disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
        </form>
    </div>
  )
}

export default LoginPage