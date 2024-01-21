import { AuthContext } from '@/src/Context/UserContext';
import useOrder from '@/src/Hooks/useOrder';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import AdminAccessRoute from '@/src/PrivetRoute/AdminAccessRoute';
import { updateOrderUrl } from '@/src/Utils/Urls/OrderUrl';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';

const sendEmail = async (email, subject, htmlContent) => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, htmlContent }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data.message);
      } else {
        console.error('Failed to send email:', data.message);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

const OrderDetails = () => {
    const { orderData, refetchOrder } = useOrder()
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const { orderId } = router?.query;

    const filterdOrderData = orderData?.filter(order => order?._id === orderId)

    let filterdOrder
    if (filterdOrderData && filterdOrderData.length > 0) {
        filterdOrder = filterdOrderData[0]
    }

    // -------- update order --------------------
    const [trakingLink, setTrakingLink] = useState(null)

    const [isDispatchOrder, setIsDispatchOrder] = useState(false);

    const [isDelevaredOrder, setIsDelevaredOrder] = useState(false);

    // const handelUpdateDispatchOrder = async () => {
    //     try {
    //         const dispatchData = {
    //             dispatchOrder: isDispatchOrder || filterdOrder?.dispatchOrder,
    //             orderTrackingLink: trakingLink || filterdOrder?.orderTrackingLink, // Use existing link if new one is not provided
    //             delevaredOrder: isDelevaredOrder || filterdOrder?.delevaredOrder,
    //         }

    //         const response = await fetch(updateOrderUrl(orderId), { // Added await here
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(dispatchData),
    //         });

    //         const data = await response.json()

    //         if (isDispatchOrder) {
    //             // Send email for order dispatch
    //             const dispatchEmailSubject = "Your order has been dispatched!";
    //             const dispatchEmailContent = `<p>Your order with ID ${orderId} has been dispatched. It will be on its way to you soon!</p>`;
    //             await sendEmail(filterdOrder?.email, dispatchEmailSubject, dispatchEmailContent);
    //           } else if (isDelevaredOrder) {
    //             // Send email for order delivery
    //             const deliveryEmailSubject = "Your order has been delivered!";
    //             const deliveryEmailContent = `<p>Your order with ID ${orderId} has been delivered. We hope you enjoy your purchase!</p>`;
    //             await sendEmail(filterdOrder?.email, deliveryEmailSubject, deliveryEmailContent);
    //           }

    //         refetchOrder()
    //         Swal.fire({
    //             position: "center",
    //             timerProgressBar: true,
    //             title: "Successfully Update !",
    //             iconColor: "#ED1C24",
    //             toast: true,
    //             icon: "success",
    //             showClass: {
    //                 popup: "animate__animated animate__fadeInRight",
    //             },
    //             hideClass: {
    //                 popup: "animate__animated animate__fadeOutRight",
    //             },
    //             showConfirmButton: false,
    //             timer: 3500,
    //         });

    //     } catch (error) {
    //         Swal.fire({
    //             position: "center",
    //             timerProgressBar: true,
    //             title: "Something Wrang !",
    //             iconColor: "#ED1C24",
    //             toast: true,
    //             icon: "error",
    //             showClass: {
    //                 popup: "animate__animated animate__fadeInRight",
    //             },
    //             hideClass: {
    //                 popup: "animate__animated animate__fadeOutRight",
    //             },
    //             showConfirmButton: false,
    //             timer: 3500,
    //         });
    //     }
    // }
 
    const handelUpdateDispatchOrder = async () => {
        try {
            const dispatchData = {
                dispatchOrder: isDispatchOrder || filterdOrder?.dispatchOrder,
                orderTrackingLink: trakingLink || filterdOrder?.orderTrackingLink,
                delevaredOrder: isDelevaredOrder || filterdOrder?.delevaredOrder,
            };
    
            const response = await fetch(updateOrderUrl(orderId), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dispatchData),
            });
    
            const data = await response.json();
    
            if (isDispatchOrder && !isDelevaredOrder) {
                const response = await fetch('/api/dispatch', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        email: filterdOrder?.email, 
                        name:  filterdOrder.clientName,
                        totalPrice: filterdOrder.totalPrice,
                        filterdOrder: filterdOrder, 
                        orderTrackingLink: trakingLink,
                    }),
                  });
              
                  const data = await response.json();
 
              
            } else if (isDelevaredOrder) {
                const response = await fetch('/api/delivery', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        email: filterdOrder?.email, 
                        name:  filterdOrder.clientName,
                        totalPrice: filterdOrder.totalPrice,
                        filterdOrder: filterdOrder, 
                    }),
                  });
              
                  const data = await response.json();
                 
            }
    
            refetchOrder();
            Swal.fire({
                position: "center",
                timerProgressBar: true,
                title: "Successfully Update !",
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
    
        } catch (error) {
            Swal.fire({
                position: "center",
                timerProgressBar: true,
                title: "Something Wrang !",
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
        }
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
                            <h1 className='text-[1.5rem] font-bold  mb-4'>Order Traking Details</h1>
                            <div className='my-2 flex flex-col gap-3'>
                                <div className='flex gap-2 items-center'>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => setIsDispatchOrder(e.target.checked)}
                                        checked={filterdOrder?.dispatchOrder}
                                        className='p-4 rounded w-[2rem] h-[2rem] cursor-pointer'
                                        id="dispatch"

                                    />
                                    <label htmlFor={"dispatch"} className='cursor-pointer text-[1.2rem] font-semibold'>Is Order Dispatch</label>
                                </div>


                                <div>
                                    <p className='text-[1.2rem] font-semibold my-2'>Enter The Traking Link</p>
                                    <div className='border md:w-[60%] border-black'>
                                        <input
                                            type='text'
                                            placeholder='Enter the traking link'
                                            className='p-4 w-full border border-black'
                                            defaultValue={filterdOrder?.orderTrackingLink}
                                            value={trakingLink}
                                            onChange={(e) => setTrakingLink(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='flex gap-2 items-center'>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => setIsDelevaredOrder(e.target.checked)}
                                        checked={filterdOrder?.delevaredOrder}
                                        className='p-4 rounded w-[2rem] h-[2rem] cursor-pointer'
                                        id="delivary"

                                    />
                                    <label htmlFor={"delivary"} className='text-[1.2rem] font-semibold cursor-pointer'>Is Order Delevared</label>
                                </div>

                                <div className='text-[1.2rem]'>
                                    {
                                        filterdOrder?.delevaredOrder && (
                                            <div>
                                                <h1 className='text-[1.2rem] my-2 text-green-600'>Order Is Delevared</h1>
                                            </div>
                                        )
                                    }
                                </div>

                                <div className='my-2'>
                                    <button
                                        className='border border-black px-4 py-2 rounded'
                                        onClick={() => handelUpdateDispatchOrder()}
                                    >Update Order</button>
                                </div>
                            </div>
                        </div>

                        <div className='border  p-2 rounded my-4'>
                            <h1 className='text-[1.2rem] font-bold'>User Info</h1>
                            <div className='my-2 flex flex-col gap-3'>
                                <h1 className='text-[1.2rem]'>User Name : {filterdOrder?.clientName}</h1>
                                <h1 className='text-[1.2rem]'>User Email : {filterdOrder?.email}</h1>
                                <h1 className='text-[1.2rem]'>User Phone : {filterdOrder?.clientPhone}</h1>
                            </div>
                        </div>

                        <div className='border  p-2 rounded my-4'>
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

export default OrderDetails;