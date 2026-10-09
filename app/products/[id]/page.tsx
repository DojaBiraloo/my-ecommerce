import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct } from '../../lib/api'
import { Product } from '@/app/lib/types'
 

const ProductById = async({params}: {params: Promise<{id :string}>}) => {

    const {id} = await params;

    let product:Product;
    try{
        product =await getProduct(id);
    }catch{
        notFound();
    }
    return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-indigo-50/40 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-800"
        >
          ← Back to products
        </Link>
 
        <div className="mt-6 grid overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200/70 md:grid-cols-2">
          <div className="relative min-h-80 bg-white md:min-h-125">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain p-12"
            />
          </div>
 
          <div className="flex flex-col gap-4 bg-slate-50 p-8 md:p-10">
            <span className="w-fit rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold capitalize text-indigo-600">
              {product.category}
            </span>
 
            <h1 className="text-3xl font-extrabold leading-snug text-slate-900">
              {product.title}
            </h1>
 
 
            <p className="leading-relaxed text-slate-600">{product.description}</p>
 
            <p className="mt-auto pt-4 text-4xl font-extrabold text-slate-900">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductById