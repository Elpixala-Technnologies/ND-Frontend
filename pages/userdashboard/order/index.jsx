import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/src/Context/UserContext';
import { getOrderByEmailUrl } from '@/src/Utils/Urls/OrderUrl';
import UserdashboardLayout from '@/src/Layouts/UserDashboardLayout';
import useOrder from '@/src/Hooks/useOrder';

const OrderForUser = () => {
    const [userOrderData, setUserOrderData] = useState(null)
    const { user } = useContext(AuthContext);
    const {handelOrderDelete} = useOrder()

    useEffect(() => {
        if (user) {
            const getOrderData = async () => {
                const res = await fetch(getOrderByEmailUrl(user?.email));
                const data = await res.json();
                setUserOrderData(data?.data);
            };
            getOrderData();
        }
    }, [user]);

    return (
        <UserdashboardLayout>
           <section>
                    <div>
                        <h1>Total Order</h1>
                    </div>

                    {/* ============ */}
                    <section className="container px-4 mx-auto">
                        <div className="flex flex-col">
                            <div className="  overflow-x-auto sm:-mx-6 ">
                                <div className="inline-block w-full py-2 align-middle md:px-6 lg:px-8">
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
                                                {userOrderData &&
                                                    userOrderData?.map((order, Index) => {
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
                                </div>
                            </div>
                        </div>
                    </section>

                </section>
        </UserdashboardLayout>
    );
};

export default OrderForUser;