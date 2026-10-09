'use client'

import { getProduct, updateProducts } from '@/app/lib/api';
import { Product } from '@/app/lib/types';
import Image from 'next/image';
import { notFound, useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const UpdatePage = () => {

    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    // let product: Product;
    // try{
    //     product = await getProduct(id);
    // }catch{
    //     notFound();
    // }   

    const router = useRouter();

    useEffect(() => {
          if (!id) return;
        getProduct(id)
            .then((data) => {
                const item = data ?? [];
                setTitle(item.title ?? '');
                setPrice(item.price ?? '');
                setDescription(item.description ?? '');
                setCategory(item.category ?? '');
                setImage(item.image ?? '');
            }).catch((err) => {
                setError(err.message || 'Failed to fetch product data');
            })
    }, [id]);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await updateProducts(id, {
                title, price, description, category, image
            });
            router.push("/products");
            console.log("Updated sucessfully");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }


    }


    return (
        <div>
           <form onSubmit={handleUpdate}>
             <input type="text" value={title} className='border p-4' placeholder='Input' onChange={(e) => setTitle(e.target.value)} />
            <input type="text" value={price} className='border p-4' placeholder='Input' onChange={(e) => setPrice(e.target.value)} />
            <input type="text" value={description} className='border p-4' placeholder='Input' onChange={(e) => setDescription(e.target.value)} />
            <input type="text" value={category} className='border p-4' placeholder='Input' onChange={(e) => setCategory(e.target.value)} />

            <input type="text" value={image} className='border p-4' placeholder='Input' onChange={(e) => setImage(e.target.value)}/>
            <button type='submit' disabled={loading} className='border p-4'>{loading ? "Loading..." : "Update"}</button>
           </form>

        </div>
    )
}

export default UpdatePage