import UserdashboardLayout from "@/src/Layouts/UserDashboardLayout";
import { AuthContext } from "@/src/Context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Welcome } from "@/src/Assets";
import { useQuery } from "@tanstack/react-query";
import { getAddressByEmailUrl } from "@/src/Utils/Urls/AddressUrl";
import { MdVerified } from "react-icons/md";
import useCommonApiData from "@/src/Hooks/useCommonApiData";
import { FaPowerOff, FaRegEdit } from "react-icons/fa";
import AddressModal from "@/src/Shared/Modal/AddressModal/AddressModal";
import UpdateAddressModal from "@/src/Shared/Modal/AddressModal/UpdateAddressModal";
import ProfileModal from "@/src/Shared/Modal/AddressModal/ProfileModal";

const UserDashboard = () => {
    const [isAddressModalOpen,
        setIsAddressModalOpen,] = useState(false);
    const [isUpdateAddressModalOpen,
        setIsUpdateAddressModalOpen,] = useState(false);
    const [addressDataValue, setAddressDataValue] = useState({});

    const { user } = useContext(AuthContext);

    const {
        data: UserAdddressData,
        isLoading: UserAdddressoaded,
        refetch: refetchUserAdddress,
    } = useQuery({
        queryKey: ["UserAdddressData"],
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
    const creationDate = new Date(user?.metadata?.creationTime);

    // Format the date to a readable string (e.g., '25 May 2024')
    const options1 = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = creationDate.toLocaleDateString("en-GB", options1);

    const lastSignInDate = new Date(user?.metadata?.lastSignInTime);

    // Format the date and time to a readable string (e.g., '25 May 2024, 10:16 AM')
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };
    const formattedDateTime = lastSignInDate.toLocaleString("en-GB", options);
    const { handleLogout } = useCommonApiData();


    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleDateString(undefined, options);
    };
    const displayName = user?.displayName || "";
    const [firstName, lastName] = displayName.split(' ').length > 1 ? displayName.split(' ') : [displayName, ""];



    const handleAddressModal = () => {
        setIsAddressModalOpen(true);
    }

    const handleUpdateAddressModal = (addressDataValue) => {
        setIsUpdateAddressModalOpen(true);
        setAddressDataValue(addressDataValue);
    }







    return (
        <UserdashboardLayout>

            {
                UserAdddressData && UserAdddressData?.map((addressValueData) => {
                    return (
                        <>
                            <section className=" bg-gray-100">
                                <div className="flex mx-4">
                                    <div className="flex flex-col items-start justify-start gap-4 w-1/2 ">
                                        <h1 className="text-2xl flex flex-col items-center justify-center mt-5 gap-2 border-b-2 w-fit">
                                            <span>Welcome , {user?.displayName.toUpperCase()}</span>
                                        </h1>
                                        <p className="text-base text-gray-400 flex items-start justify-start">{formatDate(currentTime)}</p>
                                    </div>

                                    <div className="w-1/2 flex items-center gap-4 justify-end px-10">
                                        <div
                                            className='rounded-md p-2 flex flex-col md:flex-row gap-4'
                                        >
                                            <button
                                                onClick={
                                                    () => handleUpdateAddressModal(addressValueData)
                                                }
                                                className="border-2 border-black  rounded-lg p-2 hover:text-white hover:bg-black"
                                            >
                                                Edit Details
                                            </button>


                                        </div>
                                        <img
                                            src={user?.photoURL}
                                            alt="user"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </div>
                                </div>

                                <div className="my-10 flex flex-col mx-4">
                                    <span className="text-4xl font-semibold">Account Information</span>
                                    <span className="text-2xl text-gray-400">Update your details</span>


                                </div>

                                <div className="flex flex-col items-start justify-start mt-10 w-auto  p-5 border border-gray-300 rounded-lg mx-4 mb-16">
                                    <div>
                                        <span className="text-2xl font-semibold">Personal Information</span>
                                    </div>
                                    <div className="my-2 text-lg w-full rounded-lg flex justify-between items-center gap-4">
                                        <div className="my-2 text-lg w-1/2  flex flex-col justify-start items-start ">
                                            <span className="text-xl font-light">First Name : &nbsp;</span>
                                            <span className="text-xl flex items-center border border-gray-300 p-2 w-full rounded-lg bg-white text-gray-400">
                                                {firstName}
                                            </span>
                                        </div>
                                        <div className="my-2 text-lg w-1/2 rounded-lg flex flex-col justify-start items-start ">
                                            <span className="text-xl font-light">Last Name : &nbsp;</span>
                                            <span className="border  border-gray-300 p-2 w-full rounded-lg bg-white text-gray-400">{lastName}</span>
                                        </div>

                                    </div>
                                    <div className="my-2 text-lg w-full rounded-lg flex justify-between items-center gap-4">
                                        <div className="my-2 text-lg w-1/2   rounded-lg flex flex-col justify-start items-start ">
                                            <span className="text-xl font-light">Email Id : &nbsp;</span>
                                            <span className="text-xl flex items-center border  border-gray-300 p-2 w-full rounded-lg bg-white text-gray-400">
                                                {user?.email} &nbsp;
                                                {user?.emailVerified && (
                                                    <MdVerified className="text-green-600 text-2xl" />
                                                )}
                                            </span>
                                        </div>
                                        <div className="my-2 text-lg w-1/2   rounded-lg flex flex-col justify-start items-start ">
                                            <span className="text-xl font-light">Phone number: &nbsp;</span>
                                            <span className="text-xl flex items-center border  border-gray-300 p-2 w-full rounded-lg bg-white text-gray-400">
                                                {addressValueData?.phone || "Not Provided"}

                                            </span>
                                        </div>
                                    </div>





                                    <div className="w-1/2 flex items-center justify-between">
                                        <span className="text-2xl font-semibold">Additional Information</span>

                                    </div>
                                    <div className='gap-4 grid grid-cols-2 my-4 w-1/2'>

                                        <div
                                            className=''
                                        >
                                            <span className="text-xl font-light">Address: &nbsp;</span>
                                            <span className="text-xl flex items-center border  border-gray-300 p-2 w-full rounded-lg bg-white text-gray-400">
                                                {addressValueData?.address || "Not Provided"}

                                            </span>
                                        </div>

                                        <div
                                            className=''
                                        >
                                            <span className="text-xl font-light">City: &nbsp;</span>
                                            <span className="text-xl flex items-center border  border-gray-300 p-2 w-full rounded-lg bg-white text-gray-400">
                                                {addressValueData?.city || "Not Provided"}

                                            </span>
                                        </div>


                                        <div
                                            className=''
                                        >
                                            <span className="text-xl font-light">Country: &nbsp;</span>
                                            <span className="text-xl flex items-center border  border-gray-300 p-2 w-full rounded-lg bg-white text-gray-400">
                                                {addressValueData?.country || "Not Provided"}

                                            </span>
                                        </div>

                                        <div className=''>
                                            <span className="text-xl font-light">State &nbsp;</span>
                                            <span className="text-xl flex items-center border  border-gray-300 p-2 w-full rounded-lg bg-white text-gray-400">
                                                {addressValueData?.state || "Not Provided"}
                                            </span>
                                        </div>

                                        <div className=''>
                                            <span className="text-xl font-light">Zip: &nbsp;</span>
                                            <span className="text-xl flex items-center border  border-gray-300 p-2 w-full rounded-lg bg-white text-gray-400">
                                                {addressValueData?.zip || "Not Provided"}

                                            </span>
                                        </div>



                                    </div>




                                </div>

                                <div className="py-10 gap-4 flex flex-col px-5 bg-white">
                                    <span className="text-2xl font-medium w-full">FAQs</span>
                                    <div className='faq'>
                                        <input id='faq-a' type='checkbox' />
                                        <label htmlFor='faq-a'>
                                            <p className="faq-heading">What are the shipping options and delivery times?</p>
                                            <div className='faq-arrow'></div>
                                            <p className="faq-text">We offer standard and express shipping options. Standard shipping typically takes 5-7 business days, while express shipping takes 2-3 business days. International shipping times may vary.</p>
                                        </label>
                                        <input id='faq-b' type='checkbox' />
                                        <label htmlFor='faq-b'>
                                            <p className="faq-heading">What is your return policy?</p>
                                            <div className='faq-arrow'></div>
                                            <p className="faq-text">You can return any book within 30 days of purchase for a full refund or exchange. The book must be in the same condition as when you received it. Please contact our customer service for return instructions.</p>
                                        </label>
                                        <input id='faq-c' type='checkbox' />
                                        <label htmlFor='faq-c'>
                                            <p className="faq-heading">Are the books new or used?</p>
                                            <div className='faq-arrow'></div>
                                            <p className="faq-text">We sell both new and used books. The condition of each book is clearly stated in the product description. Used books may show signs of wear, but we ensure they are in good readable condition.</p>
                                        </label>
                                        <input id='faq-d' type='checkbox' />
                                        <label htmlFor='faq-d'>
                                            <p className="faq-heading">How can I track my order?</p>
                                            <div className='faq-arrow'></div>
                                            <p className="faq-text">Once your order has been shipped, you will receive an email with a tracking number. You can use this number to track your order on our website or the carrier's website.</p>
                                        </label>
                                        <input id='faq-e' type='checkbox' />
                                        <label htmlFor='faq-e'>
                                            <p className="faq-heading">Do you offer gift wrapping services?</p>
                                            <div className='faq-arrow'></div>
                                            <p className="faq-text">Yes, we offer gift wrapping services for an additional fee. You can select the gift wrapping option during checkout and include a personalized message if desired.</p>
                                        </label>
                                        <input id='faq-f' type='checkbox' />
                                        <label htmlFor='faq-f'>
                                            <p className="faq-heading">Can I pre-order upcoming book releases?</p>
                                            <div className='faq-arrow'></div>
                                            <p className="faq-text">Yes, we accept pre-orders for upcoming book releases. Pre-ordered books will be shipped to you as soon as they are released.</p>
                                        </label>
                                        <input id='faq-g' type='checkbox' />
                                        <label htmlFor='faq-g'>
                                            <p className="faq-heading">What payment methods do you accept?</p>
                                            <div className='faq-arrow'></div>
                                            <p className="faq-text">We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely to ensure your information is protected.</p>
                                        </label>
                                        <input id='faq-h' type='checkbox' />
                                        <label htmlFor='faq-h'>
                                            <p className="faq-heading">Do you offer discounts for bulk purchases?</p>
                                            <div className='faq-arrow'></div>
                                            <p className="faq-text">Yes, we offer discounts for bulk purchases. Please contact our customer service team with your requirements, and we will provide you with a custom quote.</p>
                                        </label>
                                    </div>
                                </div>
                            </section>

                        </>
                    )
                })
            }


            <ProfileModal
                isUpdateAddressModalOpen={isUpdateAddressModalOpen}
                setIsUpdateAddressModalOpen={setIsUpdateAddressModalOpen}
                addressDataValue={addressDataValue}
                refetchUserAdddress={refetchUserAdddress}
            />
        </UserdashboardLayout>
    );
};

export default UserDashboard;
