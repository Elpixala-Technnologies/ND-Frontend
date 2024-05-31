import { AuthContext } from '@/src/Context/UserContext';
import RootLayout from '@/src/Layouts/RootLayout';
import AddressModal from '@/src/Shared/Modal/AddressModal/AddressModal';
import { getAddressByEmailUrl } from '@/src/Utils/Urls/AddressUrl';
import { addToCartUrl, getCartUrl, removeFromCartUrl, updateCartUrl } from '@/src/Utils/Urls/BooksUrl';
import { addOrderUrl } from '@/src/Utils/Urls/OrderUrl';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import axios from 'axios';

const CheckoutPage = () => {
    const [isAddressModalOpen,
        setIsAddressModalOpen,] = useState(false);
    const [cartData, setCartData] = useState([]);
    const { user } = useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(null)
    const router = useRouter();
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


    const calculateItemPrice = (bookPrice, itemQuantity) => {
        return bookPrice * itemQuantity;
    };

    const removeFromCart = async (id) => {
        const res = await fetch(removeFromCartUrl(id), {
            method: 'DELETE',
        });
        const data = await res.json();

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

    const addToCart = async (book) => {
        const res = await fetch(addToCartUrl(user?.email), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookId: book?._id,
                quantity: 1, // You can start with a quantity of 1
            }),
        });
        const data = await res.json();
        if (data?.success) {
            Swal.fire({
                icon: 'success',
                title: 'Item added to cart',
                showConfirmButton: false,
                timer: 1500,
            });
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

    const totalPrice = cartData?.reduce((acc, curr) => {
        return acc + calculateItemPrice(curr?.book?.price, curr?.quantity);
    }, 0);

    const totalQuantity = cartData?.reduce((acc, curr) => {
        return acc + curr?.quantity;
    }, 0);


    const handelOrderNow = async () => {
        try {
            const orderData = {
                book: cartData?.map((book) => book),
                quantity: totalQuantity,
                totalPrice: totalPrice,
                email: user?.email,
                paymentDetails: paymentMethod,
                shippingAddress: AddressData[0],
                clientName: user?.displayName
            }

            const response = fetch(addOrderUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            })


            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Done',
                    showConfirmButton: false,
                    timer: 1500,
                });

                const responseEmail = await fetch("/api/payment", {
                    method: "POST",
                    body: JSON.stringify({
                        name: user?.displayName,
                        email: user?.email,
                        paymentId: paymentMethod,
                        paymentAmount: totalPrice,
                        paymentProduct: cartData?.map((book) => book),
                        paymentDate: new Date(),
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await responseEmail.json();
                router.push('/paymentsuccess');
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Something Wrang',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    const steps = [
        { label: 'Order Summary', icon: 'shopping-cart' },
        { label: 'Shipping Address', icon: 'location-marker' },
        { label: 'Payment', icon: 'credit-card' },
    ];


    const [showAlert, setShowAlert] = useState(false);
    const handleNext = () => {
        if (AddressData.length === 0) {
            setShowAlert(true);
        } else {
            setCurrentStep(currentStep + 1);
        }
    };
    const closeAlert = () => {
        setShowAlert(false);
    };
    
    const getSessionId = async () => {
       try {

        let res = await axios.get("http://localhost:3000/payment")
       if(res.data && res.data.payment_session_id) {
           console.log(res.data)
       }
        
       } catch (error) {
        console.log(error)
       }
    }

    const handelClick = async(e) => {
        e.preventDefault();

        try {
            let sessionId = await getSessionId()
        
        } catch (error) {
            console.log(error)
        }
    };



    return (
        <RootLayout>
            <div className="container mx-auto py-6 px-4">
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
                                            <FaCheck />
                                        </a>
                                        <span className={`font-semibold ${index === currentStep ? 'text-gray-900' : 'text-gray-500'}`}>{step.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-[80%] mx-auto'>
                    {
                        cartData.length>0 && currentStep === 0 ? (
                            <>
                                <div className="px-4 pt-8">
                                
                                    <p className="text-xl font-medium">Order Summary</p>
                                    <p className="text-gray-400">
                                        Check your items. And select a suitable shipping method.
                                    </p>

                                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 flex flex-col gap-4">
                                        <ul className="my-8 md::w-[60%] flex flex-col gap-4">
                                            {cartData &&
                                                cartData?.map((data) => {
                                                    const { book, _id, image, quantity } = data;
                                                    const itemPrice = book ? calculateItemPrice(book.price, quantity) : 0;
                                                    return (
                                                        <li className="border shadow px-2 rounded flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                                            <div className="shrink-0">
                                                                <Image
                                                                    width={100}
                                                                    height={100} // Add this line to specify the height
                                                                    className="w-full h-full md:h-24 md:w-24 max-w-full rounded-lg object-cover"
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
                                                                        <div className="shrink-0 w-1/4 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right flex gap-4 items-center">
                                                                            <span className="font-normal text-gray-700">₹{totalPrice}</span>{" "}

                                                                            <div className=" border rounded border-black flex sm:bottom-0 sm:top-auto">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => removeFromCart(_id)}
                                                                                    className="flex rounded p-1 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
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
                                </div>
                                {/* add previuse and next  */}

                                <div>
                                    <button
                                        className="mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                                        onClick={() => setCurrentStep(currentStep + 1)}
                                        disabled={cartData?.length === 0} // This will disable the button if cardData.length is 0
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        ):<>
                            <div className='px-4 pt-8 w-full'>
                                <p className="text-xl font-medium">No Product Added</p>
                                <div>
                                    <button
                                        className="mt-4 mb-2 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                                        
                                        
                                    >
                                        <Link href="/product">
                                        Add Products
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </>
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
                                            AddressData && AddressData.map((addressValueData, index) => (
                                                <div key={index} className='flex gap-4 flex-col my-4'>
                                                    {/* Input fields for address details */}
                                                    {Object.keys(addressValueData).map((key) => (
                                                        <div key={key} className='border-2 border-gray-300 rounded-md p-2 flex gap-2 items-center'>
                                                            <input
                                                                type="text"
                                                                className="border-2 border-gray-300 rounded-md p-2 w-full"
                                                                defaultValue={addressValueData[key]}
                                                                {...register(key)}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className='flex gap-2 justify-center my-4'>
                                    <button
                                        className="mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                    >
                                        Previous
                                    </button>

                                    <button
                                        className='mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white'
                                        onClick={handleNext}
                                    >
                                        Next
                                    </button>
                                </div>

                                {showAlert && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                                        <div className="bg-white p-4 rounded shadow-md">
                                            <p>Please enter a shipping address</p>
                                            <button className="mt-4 rounded-md bg-gray-900 px-6 py-3 font-medium text-white" onClick={closeAlert}>
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}
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

                                    <button
                                        onClick={handelClick}
                                        className={`mt-4 mb-8 text-black rounded-md border px-6 py-3 font-medium `}
                                        
                                    >
                                        pay now 
                                    </button>

                                    <div className='my-4 w-1/2'>
                                        <p className="text-xl font-medium">Select Payment Method</p>

                                        <select
                                            className="my-2 border p-2 w-1/2 "
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        >
                                            <option value="">Select Method</option>
                                            <option value="Cash On Delivery">Cash On Delivery</option>
                                        </select>
                                    </div>


                                    <button
                                        onClick={handelOrderNow}
                                        className={`mt-4 mb-8 text-black rounded-md border px-6 py-3 font-medium ${!paymentMethod ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500'}`}
                                        disabled={!paymentMethod}
                                    >
                                        Place Order
                                    </button>
                                </div>

                                <div className='flex gap-2 justify-center my-4'>
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