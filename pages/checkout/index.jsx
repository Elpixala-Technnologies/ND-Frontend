import { AuthContext } from '@/src/Context/UserContext';
import RootLayout from '@/src/Layouts/RootLayout';
import AddressModal from '@/src/Shared/Modal/AddressModal/AddressModal';
import { getAddressByEmailUrl } from '@/src/Utils/Urls/AddressUrl';
import { getCartUrl } from '@/src/Utils/Urls/BooksUrl';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CheckoutPage = () => {
    const [isAddressModalOpen,
        setIsAddressModalOpen,] = useState(false);
    const [cartData, setCartData] = useState([]);
    const { user } = useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState(0);

    const { register, handleSubmit } = useForm();

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

    const handleAddressModal = () => {
        setIsAddressModalOpen(true);
    }
    const {
        data: AddressData,
        isLoading: Adddressoaded,
        refetch: refetchAdddress,
    } = useQuery({
        queryKey: ["AdddressData"],
        queryFn: async () => {
            try {
                const res = await fetch(getAddressByEmailUrl(user?.email));
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await res.json();
                return data.data;
            } catch (error) {
                // Handle the error, you can log it or return a default value
                console.error("Error fetching data:", error);
                throw error; // Rethrow the error so it's propagated to the caller
            }
        },
    });

    if (Adddressoaded) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    const steps = [
        { label: 'Order Summary', icon: 'shopping-cart' },
        { label: 'Shipping Address', icon: 'location-marker' },
        { label: 'Payment', icon: 'credit-card' },
    ];

    return (
        <RootLayout>
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        
                    <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                        <div className="relative">
                            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                                {steps.map((step, index) => (
                                    <li
                                        key={step.label}
                                        className={`flex items-center space-x-3 text-left sm:space-x-4 ${index === currentStep ? 'text-gray-900' : 'text-gray-500'
                                            }`}
                                    >
                                        <a
                                            className={`flex h-6 w-6 items-center justify-center rounded-full ${index === currentStep ? 'bg-emerald-200 text-emerald-700' : 'bg-gray-400 text-white'
                                                } text-xs font-semibold`}
                                            href="#"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d={index < currentStep ? 'M5 13l4 4L19 7' : 'M5 13l4 4M19 7l-4 4'} />
                                            </svg>
                                        </a>
                                        <span className={`font-semibold ${index === currentStep ? 'text-gray-900' : 'text-gray-500'}`}>{step.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='w-[80%] mx-auto'>
                    {
                        currentStep === 0 && (
                            <>
                                <div className="px-4 pt-8">
                                    <p className="text-xl font-medium">Order Summary</p>
                                    <p className="text-gray-400">
                                        Check your items. And select a suitable shipping method.
                                    </p>

                                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 flex flex-col gap-4">
                                        {
                                            cartData && cartData?.map((cartValueData) => {
                                                const { book, _id, quantity, color, size } = cartValueData;
                                                const itemPrice = book?.price * quantity;
                                                return (
                                                    <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                                                        <img
                                                            className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                                                            src={book?.image[0]}
                                                            alt={book?.name}
                                                        />
                                                        <div className="flex w-full flex-col px-4 py-4">
                                                            <span className="font-semibold">
                                                                {book?.name}
                                                            </span>
                                                            <span className="float-right text-gray-400">
                                                                Size : {size}
                                                            </span>
                                                            <span className="float-right text-gray-400">
                                                                Color : {color}
                                                            </span>
                                                            <span className="float-right text-gray-400">
                                                                Total Quantity: {quantity}
                                                            </span>
                                                            <p className="text-lg font-bold">
                                                                Price : <span className="text-xs font-normal text-gray-400">₹</span>{" "} {Math.round(itemPrice)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                                {/* add previuse and next  */}

                                <div>
                                    <button
                                        className="mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                                        onClick={() => setCurrentStep(currentStep + 1)}
                                    >
                                        Next
                                    </button>
                                </div>

                            </>
                        )
                    }

                    {
                        currentStep === 1 && (
                            <>
                                <div className='px-4 pt-8 w-full'>
                                    <p className="text-xl font-medium">Shipping Address</p>
                                    <div>
                                        <button
                                            className="mt-4 mb-2 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                                            onClick={handleAddressModal}
                                        >
                                            Add New Address
                                        </button>
                                    </div>

                                    <div className='flex flex-col gap-4 border p-2 rounded'>
                                        {
                                            AddressData && AddressData?.map((addressValueData) => {
                                                return (
                                                    <div className='flex gap-4 flex-col my-4'>
                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input
                                                                type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.name}
                                                                {...register("name")}
                                                            />
                                                        </div>
                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.level}
                                                                {...register("level")}
                                                            />
                                                        </div>
                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.address}
                                                                {...register("address")}
                                                            />
                                                        </div>

                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.city}
                                                                {...register("city")}
                                                            />
                                                        </div>

                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.state}
                                                                {...register("state")}
                                                            />
                                                        </div>

                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.zip}
                                                                {...register("zip")}
                                                            />
                                                        </div>

                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.country}
                                                                {...register("country")}
                                                            />
                                                        </div>

                                                        <div
                                                            className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'
                                                        >
                                                            <input type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData.phone}
                                                                {...register("phone")}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className='flex gap-2 justify-center my-4'>
                                    {/* === add previuse and next = */}
                                    <button
                                        className="mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                    >
                                        Previous
                                    </button>

                                    <button
                                        className='mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white'
                                        onClick={() => setCurrentStep(currentStep + 1)}
                                    >
                                        <a className="mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                                            Next
                                        </a>
                                    </button>
                                </div>

                            </>
                        )
                    }

                    {
                        currentStep === 2 && (
                            <>
                                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                                    <p className="text-xl font-medium">Payment Details</p>
                                    <p className="text-gray-400">
                                        Complete your order by providing your payment details.
                                    </p>
                                    <div className="">
                                        <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                                placeholder="your.email@gmail.com"
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <label
                                            htmlFor="card-holder"
                                            className="mt-4 mb-2 block text-sm font-medium"
                                        >
                                            Card Holder
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="card-holder"
                                                name="card-holder"
                                                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                                placeholder="Your full name here"
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <label
                                            htmlFor="card-no"
                                            className="mt-4 mb-2 block text-sm font-medium"
                                        >
                                            Card Details
                                        </label>
                                        <div className="flex">
                                            <div className="relative w-7/12 flex-shrink-0">
                                                <input
                                                    type="text"
                                                    id="card-no"
                                                    name="card-no"
                                                    className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder="xxxx-xxxx-xxxx-xxxx"
                                                />
                                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                                    <svg
                                                        className="h-4 w-4 text-gray-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={16}
                                                        height={16}
                                                        fill="currentColor"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                name="credit-expiry"
                                                className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                                placeholder="MM/YY"
                                            />
                                            <input
                                                type="text"
                                                name="credit-cvc"
                                                className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                                placeholder="CVC"
                                            />
                                        </div>
                                        <label
                                            htmlFor="billing-address"
                                            className="mt-4 mb-2 block text-sm font-medium"
                                        >
                                            Billing Address
                                        </label>
                                        <div className="flex flex-col sm:flex-row">
                                            <div className="relative flex-shrink-0 sm:w-7/12">
                                                <input
                                                    type="text"
                                                    id="billing-address"
                                                    name="billing-address"
                                                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                                    placeholder="Street Address"
                                                />
                                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                                    <img
                                                        className="h-4 w-4 object-contain"
                                                        src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <select
                                                type="text"
                                                name="billing-state"
                                                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                            >
                                                <option value="State">State</option>
                                            </select>
                                            <input
                                                type="text"
                                                name="billing-zip"
                                                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                                placeholder="ZIP"
                                            />
                                        </div>
                                        {/* Total */}
                                        <div className="mt-6 border-t border-b py-2">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                                                <p className="font-semibold text-gray-900">$399.00</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900">Shipping</p>
                                                <p className="font-semibold text-gray-900">$8.00</p>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-900">Total</p>
                                            <p className="text-2xl font-semibold text-gray-900">$408.00</p>
                                        </div>
                                    </div>
                                    <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                                        Place Order
                                    </button>
                                </div>

                                <div className='flex gap-2 justify-center my-4'>
                                    {/* === add previuse and next = */}
                                    <button
                                        className="mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                    >
                                        Previous
                                    </button>
                                </div>
                            </>
                        )
                    }
                </div>

            </div>

            <AddressModal
                isAddressModalOpen={isAddressModalOpen}
                setIsAddressModalOpen={setIsAddressModalOpen}
                refetchUserAdddress={refetchAdddress}
            />
        </RootLayout>
    );
};

export default CheckoutPage;