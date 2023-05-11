import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

export default function NewProducts() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0)
    const router = useRouter()

    const createProduct = async (/** @type {{ preventDefault: () => void; }} */ e) => {
        e.preventDefault()
        const data = { title, description, price }
        await axios.post('/api/products', data).then(() => {
            router.push('/products')
        })
    }

    return (
        <Layout>
            <button onClick={() => router.back()} className="flex gap-1 mb-2 py-1 hover:bg-gray-200 overflow-hidden text-black rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-slate-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span className="px-2">
                    Go Back
                </span>
            </button>
            <form onSubmit={createProduct}>
                <h1 className="">New Product</h1>
                <label htmlFor="productName">Product Name</label>
                <input name="productName" value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="product name" className="rounded-md" />

                <label htmlFor="productDescription">Product Description</label>
                <textarea name="productDescription" value={description} onChange={(e) => setDescription(e.target.value)} cols={30} rows={10} placeholder="description"></textarea>

                <label htmlFor="productPrice">Product Price(NGN)</label>
                <input name="productPrice" value={price} onChange={(e) => setPrice(Number(e.target.value))} type="number" placeholder="price" className="rounded-md" />

                <button type="submit" className="btn-primary">Save</button>
            </form>
        </Layout>
    )
}