import Layout from "@/components/Layout";
import Modal from "@/components/common/Modal";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({})


    useEffect(() => {
        axios.get('/api/products').then((response) => setProducts(response.data))
    }, [])

    const initiateDelete = async (/** @type {React.SetStateAction<{}>} */ product) => {
        setShowModal(true);
        setSelectedProduct(product)
    }

    const deleteProduct = async () => {
        try {
            // @ts-ignore
            await axios.delete('/api/products?id=' + selectedProduct._id).then((res) =>
                axios.get('/api/products').then((response) => setProducts(response.data))
            )
            setShowModal(false);
            // @ts-ignore
            setProducts(products.filter((product) => product.id !== selectedProduct._id))
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Layout>
            <div className="flex flex-col">
                <Link className="px-2 flex py-1 ml-auto hover:bg-blue-600 text-white bg-blue-400 rounded-md items-end" href={"/products/new"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new product
                </Link>
                <table className="basic mt-2">
                    <thead>
                        <tr>
                            <td className="font-medium">Product Name</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product.title}</td>
                                <td>
                                    <Link href={`/products/edit/${product._id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                        Edit
                                    </Link>
                                    <button onClick={() => initiateDelete(product)} className="inline-flex items-center bg-red-600 px-2 py-1 text-sm rounded-md text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Modal */}
            <Modal show={showModal} toggleModal={setShowModal}>
                <div className="mt-3 text-center">
                    <div
                        className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 text-red-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                    </div>

                    {/* @ts-ignore */}
                    <h3 className="text-lg leading-6 font-bold text-gray-900">Are you sure you want to delete this product - {selectedProduct.title}?</h3>
                    <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-500 font-medium">
                            This action can not be reversed!
                        </p>
                    </div>
                    <div className="flex gap-2 items-center px-4 py-3">
                        <button
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 bg-gray-200 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => deleteProduct()}
                            className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </Modal>
        </Layout>
    )
}