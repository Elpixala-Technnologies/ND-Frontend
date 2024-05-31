import useBook from '@/src/Hooks/useBook';
import { updateBooksUrl } from '@/src/Utils/Urls/BooksUrl';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const UpdateInventoryModal = ({
    isUpdateInventoryModalOpen,
    setIsUpdateInventoryModalOpen,
    selectedProduct
}) => {
    const {
        register,
        handleSubmit,
    } = useForm();
    const { refetchBooks } = useBook();

    const {
        _id,
        quantity,
        discountPercentage,
        price,
    } = selectedProduct;

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        const { discount, price, quantity } = data;

        try {
            setIsLoading(true);
            const res = await fetch(updateBooksUrl(_id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: quantity,
                    discountPercentage: discount,
                    price: price
                })
            });

            const result = await res.json();

            if (!result) {
                Swal.fire({
                    position: "center",
                    timerProgressBar: true,
                    title: "Something went wrong!",
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
            } else {
                Swal.fire({
                    position: "center",
                    timerProgressBar: true,
                    title: "Inventory Product Added Successfully!",
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
                setIsLoading(false);
                setIsUpdateInventoryModalOpen(false);
                refetchBooks()
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Modal
            title="Update Inventory"
            visible={isUpdateInventoryModalOpen}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={() => setIsUpdateInventoryModalOpen(false)}
        >
            <div className='flex justify-center items-center flex-col gap-4 mb-4'>
                <h1 className="text-3xl font-semibold text-center">Update Inventory</h1>
                <p>
                    Update Inventory of <span className="font-semibold">{selectedProduct?.name}</span>
                </p>
            </div>
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 mx-auto my-4 "
                >
                    <div className='border-2 rounded px-2'>
                        <label htmlFor="quantity">Quantity :</label>
                        <input
                            type="string"
                            id='quantity'
                            placeholder="Quantity"
                            defaultValue={quantity}
                            className='border-2 border-black rounded-md p-2'
                            {...register("quantity")}
                        />
                    </div>


                    <div  className='border-2 rounded px-2'>
                        <label htmlFor="price">Price :</label>
                        <input
                            type="string"
                            placeholder="Price"
                            id='price'
                            defaultValue={price}
                            className='border-2 border-black rounded-md p-2'
                            {...register("price")}
                        />
                    </div>

                    <div  className='border-2 rounded px-2'>
                        <label htmlFor="discount">Discount :</label>
                        <input
                            type="string"
                            placeholder="Discount"
                            id='discount'
                            defaultValue={discountPercentage}
                            className='border-2 border-black rounded-md p-2'
                            {...register("discount")}
                        />
                    </div>

                    <button
                        type="submit"
                        className="common-btn"
                    >
                        {
                            isLoading ? (
                                <div className="flex justify-center items-center gap-2">
                                    <div className="lds-dual-ring"></div>
                                    <span>Updating...</span>
                                </div>
                            ) : (
                                <span>Update</span>
                            )
                        }
                    </button>
                </form>
            </div>

        </Modal>
    );

};

export default UpdateInventoryModal;