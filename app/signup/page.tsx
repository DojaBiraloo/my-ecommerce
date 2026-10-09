'use client'

import React, { useState } from 'react'
import { getUsers, SignupUser } from '../lib/api';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const router = useRouter();

    const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // await SignupUser(username, email, password);
            // router.push('/login')
              const getData = await getUsers();
            console.log(getData)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSignin}>
                <input type="text" value={username} className='border p-3' placeholder='Enter username' onChange={(e) =>setUsername(e.target.value)} />
                <input type="email" value={email} className='border p-3' placeholder='Enter email' onChange={(e) =>setEmail(e.target.value)} />
                <input type="password" value={password} className='border p-3' placeholder='Enter password' onChange={(e) =>setPassword(e.target.value)} />

                {error && <p className='text-red-500 text-sm'>{error}</p>}
                <button className='border p-4' type='submit' disabled={loading}>{loading ? "Loading...": "Signin"}</button>
            </form>

        </div>
    )
}

export default SignupPage