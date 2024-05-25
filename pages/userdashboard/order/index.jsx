import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/src/Context/UserContext';
import { getOrderByEmailUrl, deleteOrderUrl } from '@/src/Utils/Urls/OrderUrl';
import UserdashboardLayout from '@/src/Layouts/UserDashboardLayout';
import useOrder from '@/src/Hooks/useOrder';
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AddTOCart } from '@/src/Assets';
import Image from 'next/image';

const OrderForUser = () => {
    // const [userOrderData, setUserOrderData] = useState(null)
    const { user } = useContext(AuthContext);
    // const {handelOrderDelete} = useOrder()

    // useEffect(() => {
    //     if (user) {
    //         const getOrderData = async () => {
    //             const res = await fetch(getOrderByEmailUrl(user?.email));
    //             const data = await res.json();
    //             setUserOrderData(data?.data);
    //         };
    //         getOrderData();
    //     }
    // }, [user]);

    const {
        data: userOrderData,
        isLoading: userOrderLoaded,
        refetch: refetchUserOrder,
    } = useQuery({
        queryKey: ["userOrderData"],
        queryFn: async () => {
            try {
                const res = await fetch(getOrderByEmailUrl(user?.email));
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await res.json();
                return data.data;
            } catch (error) {
                throw error;
            }
        },
    });


    const handelOrderDelete = async (id) => {
        const confirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirmed.isConfirmed) {
            const res = await fetch(deleteOrderUrl(id), {
                method: "DELETE",
            });
            const data = await res.json();
            if (!data) {
                Swal.fire({
                    position: "center",
                    timerProgressBar: true,
                    title: data.message,
                    iconColor: "#ED1C24",
                    toast: true,
                    icon: "error",
                    showClass: {
                        popup: "animate__animated animate__fadeInRight",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutRight",
                    },
                    showConfirmButton: false,
                    timer: 3500,
                });
                refetchUserOrder()
            } else {
                Swal.fire({
                    position: "center",
                    timerProgressBar: true,
                    title: "Successfully Delete !",
                    iconColor: "#ED1C24",
                    toast: true,
                    icon: "success",
                    showClass: {
                        popup: "animate__animated animate__fadeInRight",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutRight",
                    },
                    showConfirmButton: false,
                    timer: 3500,
                });
                refetchUserOrder();
            }
        }
    };


    return (
        <UserdashboardLayout>
            <section>
                <div>
                    {userOrderData?.length > 0 ? <h1 className='text-3xl font-bold my-5'>Your Orders</h1> : <h1 className='text-3xl font-bold my-5'>No Orders Yet</h1>}
                </div>

                {/* ============ */}
                <section className="container px-4 mx-auto">
                    <div className="flex flex-col">
                        <div className="  overflow-x-auto sm:-mx-6 ">
                            <div className="inline-block w-full py-2 align-middle md:px-6 lg:px-8">
                                {userOrderData?.length > 0 ?
                                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-800">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                    >
                                                        S No.
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                    >
                                                        Product Price
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                    >
                                                        Total Product
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                    >
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                                                {userOrderData?.map((order, Index) => {
                                                    return (
                                                        <tr key={Index}>
                                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                                <div className="inline-flex items-center gap-x-3">
                                                                    <span>{Index + 1}</span>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                Rs. {order?.totalPrice}
                                                            </td>

                                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                {order?.quantity}
                                                            </td>

                                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                <div className="flex items-center gap-x-6">
                                                                    <button
                                                                        className="text-red-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                                                                        onClick={() =>
                                                                            handelOrderDelete(order?._id)
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </button>

                                                                    <Link
                                                                        href={`/userdashboard/order/${order?._id}`}
                                                                        className='font-bold text-white'
                                                                    >Order Details</Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>

                                        </table>

                                    </div>
                                    : <>
                                        <div className='flex flex-col '>

                                            <Image src={AddTOCart} alt="name" className='w-1/3 mx-auto' width={500} height={500} />
                                            <Link href={'/'}>

                                            <div className='flex items-center justify-center mt-10'>
                                            <button class="btn-53">
                                                <div class="original">Order Now</div>
                                                <div class="letters">

                                                    <span>O</span>
                                                    <span>R</span>
                                                    <span>D</span>
                                                    <span>E</span>
                                                    <span>R</span>
                                                    <span>&nbsp;</span>
                                                    <span>N</span>
                                                    <span>O</span>
                                                    <span>W</span>
                                                </div>
                                            </button>
                                            </div>
</Link>

                                        </div>
                                    </>}
                            </div>
                        </div>
                    </div>
                </section>

            </section>
        </UserdashboardLayout>
    );
};

export default OrderForUser;