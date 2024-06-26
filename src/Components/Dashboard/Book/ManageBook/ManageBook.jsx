import useBook from "@/src/Hooks/useBook";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

const ManageBook = () => {
    const { handelBookDelete, bookData } = useBook();


    return (
        <section>
            <div className="grid md:grid-cols-3 gap-4 justify-center items-center">
                {bookData &&
                    bookData.length &&
                    bookData.map((bookData) => {
                        const { _id, name, price, image, discountPercentage } = bookData;
                        return (
                            <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                                key={_id}
                            >
                                <div>
                                    <Image
                                        className="w-full h-full object-cover object-center"
                                        width={300}
                                        height={300}
                                        src={image[0] || "https://images.unsplash.com/photo-1622835047087-4b3b0f5b0b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"}
                                        alt="product image"
                                    />
                                </div>
                                <div className="mt-4 px-5 pb-5">
                                    <a href="#">
                                        <h5 className="text-xl tracking-tight text-slate-900">
                                            {name}
                                        </h5>
                                    </a>
                                    <div className="mt-2 mb-5 flex items-center justify-between">
                                        <p>
                                            <span className="text-3xl font-bold text-slate-900">{price}</span>
                                            <span className="text-sm text-slate-900 line-through">
                                                {price + (price * discountPercentage) / 100}
                                            </span>
                                        </p>
                                    </div>

                                    <div className='flex gap-4  items-center'>
                                        <button className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                            onClick={() => handelBookDelete(_id)}
                                        >
                                            <FaRegTrashAlt />
                                        </button>
                                        <Link className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                            href={`/dashboard/update-book/${_id}`}
                                        >
                                            <FaRegEdit /> Update
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </section>
    );
};

export default ManageBook;