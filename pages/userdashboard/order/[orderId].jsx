import useOrder from '@/src/Hooks/useOrder';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import AdminAccessRoute from '@/src/PrivetRoute/AdminAccessRoute';
import { useRouter } from 'next/router';
import React from 'react';

const OrderDetailsForUser = () => {
    const { orderData } = useOrder()
    const router = useRouter();
    const { orderId } = router?.query;

    const filterdOrderData = orderData?.filter(order => order?._id === orderId)

    let filterdOrder
    if (filterdOrderData && filterdOrderData.length > 0) {
        filterdOrder = filterdOrderData[0]
    }

    return (
        <DashboardLayout>
            <AdminAccessRoute>
                <section>
                    <div>
                        <h1 className='font-bold text-[2rem]'>Order Details</h1>
                    </div>
                    {/* =========== */}

                    <div className='my-2'>
                        <div className='border  p-2 rounded my-4'>
                            <h1 className='text-[1.2rem] font-bold'>Order Status</h1>
                            <div className='my-2 flex flex-col gap-3'>
                                <div className='my-2'>
                                    {
                                        filterdOrder?.dispatchOrder && !filterdOrder?.delevaredOrder && (
                                            <div>
                                                <h1 className='text-[1.2rem] my-2'>Your Order Is Dispatch</h1>
                                                <Link
                                                    href={filterdOrder?.orderTrackingLink}
                                                    className='text-[1.3rem] border px-6 py-2 rounded'>
                                                    Your Order Tracking Link
                                                </Link>
                                            </div>
                                        )
                                    }
                                </div>

                                <div className='text-[1.2rem]'>
                                    {
                                        filterdOrder?.delevaredOrder && (
                                            <div>
                                                <h1 className='text-[1.2rem] my-2 text-green-600'>Your Order Is Delevared</h1>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='border  p-2 rounded my-4'>
                        <div>
                            <h1 className='text-[1.2rem] font-bold'>Address Info</h1>
                            <div className='my-2 flex flex-col gap-3'>
                                <h1 className='text-[1.2rem]'>Address : {filterdOrder?.shippingAddress?.address}</h1>
                                <h1 className='text-[1.2rem]'>City : {filterdOrder?.shippingAddress?.city}</h1>
                                <h1 className='text-[1.2rem]'>Country : {filterdOrder?.shippingAddress?.country}</h1>
                                <h1 className='text-[1.2rem]'>Email : {filterdOrder?.shippingAddress?.email}</h1>
                                <h1 className='text-[1.2rem]'>Zip: {filterdOrder?.shippingAddress?.zip}</h1>
                                <h1 className='text-[1.2rem]'>Name : {filterdOrder?.shippingAddress?.name}</h1>
                                <h1 className='text-[1.2rem]'>Phone : {filterdOrder?.shippingAddress?.phone}</h1>
                                <h1 className='text-[1.2rem]'>State : {filterdOrder?.shippingAddress?.state}</h1>
                            </div>
                        </div>

                        <div className='border  p-2 rounded my-4'>
                            <h1 className='text-[1.2rem] font-bold'>Payment Details</h1>
                            <div className='my-2'>
                                <h1 className='text-[1.2rem]'>Payment Methods : {filterdOrder?.paymentDetails}</h1>
                            </div>
                        </div>

                        <div className='border  p-2 rounded my-4'>
                            <div className='my-2 flex flex-col gap-3'>
                                <h1 className='text-[1.2rem]'>Book Quantity : {filterdOrder?.quantity}</h1>
                                <h1 className='text-[1.2rem]'>Total Price : Rs. {filterdOrder?.totalPrice}</h1>
                            </div>
                        </div>

                        <div className='border  p-2 rounded my-4'>
                            <h1 className='text-[1.2rem] font-bold'>Books Details</h1>
                            <div className='my-2'>
                                <div className='flex flex-col gap-4'>
                                    {
                                        filterdOrder?.book?.map((bookdata) => {
                                            const { book } = bookdata;

                                            return (
                                                <div className='border shadow rounded p-4 flex flex-col gap-3'>
                                                    <h1 className='text-[1.2rem]'>Book Name : {book?.name}</h1>
                                                    <h1 className='text-[1.2rem]'>Price : Rs. {book?.price}</h1>
                                                    <h1 className='text-[1.2rem]'>Discount : {book?.discountPercentage} % off</h1>
                                                    <h1 className='text-[1.2rem]'>Category : {book?.category}</h1>
                                                    <h1 className='text-[1.2rem]'>Cover : {book?.cover}</h1>
                                                    <h1 className='text-[1.2rem]'>Language: {book?.language}</h1>
                                                    <h1 className='text-[1.2rem]'>Level : {book?.level}</h1>
                                                </div>
                                            )
                                        })

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </AdminAccessRoute>
        </DashboardLayout>
    );
};

export default OrderDetailsForUser;