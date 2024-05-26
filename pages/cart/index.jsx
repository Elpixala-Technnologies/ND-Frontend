import { AuthContext } from '@/src/Context/UserContext';
import { useCart } from '@/src/Context/cartContext';
import RootLayout from '@/src/Layouts/RootLayout';
import { getCartUrl, removeFromCartUrl, updateCartUrl, addToCartUrl } from '@/src/Utils/Urls/BooksUrl'; // Assuming you have addToCartUrl
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';




const CartPage = () => {
    const { user } = useContext(AuthContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        if (user) {
            const getCartData = async () => {
                const res = await fetch(getCartUrl(user?.email));
                const data = await res.json();
                setCartData(data?.data);
            };
            getCartData();
        }
    }, [user]);

    const removeFromCart = async (id) => {
        const res = await fetch(removeFromCartUrl(id), {
            method: 'DELETE',
        });
        const data = await res.json();
        console.log(data);

        if (data?.success) {
            Swal.fire({
                icon: 'success',
                title: 'Your item has been removed',
                showConfirmButton: false,
                timer: 1500,
            });
            setCartData(cartData.filter((data) => data._id !== id));
        }
    };
    const updateCartItemQuantity = async (id, newQuantity) => {
        const res = await fetch(updateCartUrl(id), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: newQuantity,
            }),
        });
        const data = await res.json();
        console.log(data);
        if (data?.success) {
            // Update the cartData here
            const updatedCartData = cartData.map((item) => {
                if (item._id === id) {
                    return {
                        ...item,
                        quantity: newQuantity,
                    };
                }
                return item;
            });
            setCartData(updatedCartData);
        }
    };

    const calculateItemPrice = (bookPrice, itemQuantity) => {
        return bookPrice * itemQuantity;
    };

    const totalPrice = cartData?.reduce((acc, curr) => {
        return acc + calculateItemPrice(curr?.book?.price, curr?.quantity);
    }, 0);

    const totalQuantity = cartData?.reduce((acc, curr) => {
        return acc + curr?.quantity;
    }, 0);

    return (
        <RootLayout>
            <section className="min-h-[50vh]">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mt-8 md:w-[70%] md:mt-12">
                        <div className="bg-white border border-gray-200 rounded-2xl m-6 p-6">
                            <div className="px-4 py-6 sm:px-8 sm:py-10">
                                <div className="flow-root">
                                    <ul className="-my-8 flex flex-col gap-4">
                                        {cartData &&
                                            cartData?.map((data) => {
                                                const { book, _id, image, quantity } = data;
                                                const itemPrice = book ? calculateItemPrice(book.price, quantity) : 0;
                                                return (
                                                    <li className="flex border p-4 flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0 rounded-md">
                                                        <div className="shrink-0">
                                                            <Image
                                                                width={100}
                                                                height={100} // Add this line to specify the height
                                                                className="h-full w-full md:h-24 md:w-24 max-w-full rounded-lg object-cover"
                                                                src={book?.image[0]}
                                                                alt={book?.name}
                                                            />
                                                        </div>
                                                        <div className="relative flex flex-1 flex-col justify-between">
                                                            <div className="sm:col-gap-5 sm:grid sm:grid-cols-2 flex flex-col">
                                                                <div className="pr-8 sm:pr-5">
                                                                    <p className="text-base font-semibold text-gray-900">
                                                                        {book?.name}
                                                                    </p>

                                                                    <p className="text-base  text-gray-900">
                                                                        Price : Rs. {book?.price}
                                                                    </p>

                                                                    <p className="text-base  text-gray-900">
                                                                        {
                                                                            book?.discountPercentage !== "0" && (
                                                                                <span> Discount : Rs. {book?.discountPercentage} % of</span>
                                                                            )
                                                                        }

                                                                    </p>

                                                                    <p className="text-base  text-gray-900">
                                                                        Total Quantity : {quantity}
                                                                    </p>
                                                                </div>

                                                                <div className="mt-4 flex items-center justify-evenly">

                                                                    <div className="shrink-0 text-base font-semibold text-gray-900 sm:order-2  flex gap-4 w-1/4 items-center">
                                                                        <span className="font-normal text-gray-700">₹    {itemPrice}</span>{" "}


                                                                        <div className="flex sm:bottom-0 sm:top-auto">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => removeFromCart(_id)}
                                                                                className="flex border border-gray-300 rounded p-1 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                                                            >
                                                                                <svg
                                                                                    className="h-5 w-5"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    fill="none"
                                                                                    viewBox="0 0 24 24"
                                                                                    stroke="currentColor"
                                                                                >
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        strokeWidth={2}
                                                                                        d="M6 18L18 6M6 6l12 12"
                                                                                        className=""
                                                                                    />
                                                                                </svg>
                                                                            </button>
                                                                        </div>

                                                                    </div>

                                                                    <div className="sm:order-1">
                                                                        <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                                                            <button
                                                                                className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                                                                onClick={() => {
                                                                                    if (quantity > 1) {
                                                                                        updateCartItemQuantity(_id, quantity - 1);
                                                                                    }
                                                                                }}
                                                                            >
                                                                                -
                                                                            </button>
                                                                            <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                                                                {quantity}
                                                                            </div>
                                                                            <button
                                                                                className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                                                                onClick={() =>
                                                                                    updateCartItemQuantity(_id, quantity + 1)
                                                                                }
                                                                            >
                                                                                +
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </div>

                                <div className="mt-16 flex items-center justify-between">
                                    <p className="text-lg font-semibold text-gray-900">Total</p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        <span className="text-base font-normal text-gray-400">₹</span>{" "}
                                        {totalPrice}
                                    </p>
                                </div>

                                <div className="mt-6 text-center">
                                    <Link href="/checkout"
                                        type="button"
                                        className={`group inline-flex w-full items-center justify-center rounded-md px-6 py-4 text-lg font-semibold text-white
                                         transition-all duration-200 ease-in-out focus:shadow 
                                          ${cartData.length <= 0 ?
                                                'bg-gray-300 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800'}`}
                                        style={{ pointerEvents: cartData.length <= 0 ? 'none' : 'auto' }}
                                        aria-disabled={cartData.length <= 0}
                                    >
                                        Checkout
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </RootLayout>
    );
};

export default CartPage;
