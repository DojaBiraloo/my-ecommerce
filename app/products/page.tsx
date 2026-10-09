'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getProducts } from '../lib/api'
import { Product } from '../lib/types'
import { useRouter } from 'next/navigation'

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data: Product[] = await getProducts();
        setProducts(data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  


  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-indigo-50/40">
      {/* Header */}
      <header className="mx-auto max-w-7xl px-6 pt-14 pb-8 text-center">
        <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-600">
          New arrivals
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Discover our{' '}
          <span className="bg-linear-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
            products
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-500">
          Hand-picked items across fashion, jewelry and electronics.
        </p>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        {/* Error */}
        {error && (
          <p className="mx-auto max-w-md rounded-xl bg-red-50 p-4 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="h-64 bg-slate-200" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-3/4 rounded bg-slate-200" />
                  <div className="h-4 w-1/2 rounded bg-slate-200" />
                  <div className="h-10 rounded-xl bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product grid */}
        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-indigo-200"
              >
                <div className="relative h-64 bg-white p-6">
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-indigo-600/90 px-3 py-1 text-[11px] font-semibold capitalize text-white">
                    {item.category}
                  </span>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-8 transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 border-t border-slate-100 p-5">
                  <h2 className="line-clamp-2 min-h-12 font-semibold leading-snug text-slate-800">
                    {item.title}
                  </h2>

                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-extrabold text-slate-900">
                      ${item.price.toFixed(2)}
                    </p>
                    {/* <p className="flex items-center gap-1 text-sm text-amber-500">
                      ★ <span className="font-medium text-slate-600">{item.rating?.rate}</span>
                      <span className="text-slate-400">({item.rating?.count})</span>
                    </p> */}
                  </div>

                  <button
                    onClick={() => router.push(`/products/${item.id}`)}
                    className="mt-auto w-full cursor-pointer rounded-xl bg-linear-to-r from-indigo-600 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:brightness-110 active:scale-[0.98]"
                  >
                    Preview item
                  </button>

                   <button
                    onClick={() => router.push(`/products/update/${item.id}`)}
                    className="mt-auto w-full cursor-pointer rounded-xl bg-linear-to-r from-indigo-600 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:brightness-110 active:scale-[0.98]"
                  >
                    Update item
                  </button>

                  <button
                    className="mt-auto w-full cursor-pointer rounded-xl bg-linear-to-r from-indigo-600 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:brightness-110 active:scale-[0.98]"
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      
    </main>
  )
}

export default ProductsPage