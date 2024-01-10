import { AuthContext } from '@/src/Context/UserContext';
import useAddress from '@/src/Hooks/useAddress';
import { addAddressUrl } from '@/src/Utils/Urls/AddressUrl';
import { Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AddressModal = ({
    isAddressModalOpen,
    setIsAddressModalOpen,
    refetchUserAdddress
}) => {
    const { handleSubmit, register } = useForm();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const userEmail = user?.email;
    const handleCancel = () => {
        setIsAddressModalOpen(false);
    }


    const onSubmit = async (inputValue) => {
        try {
            const { address, city, country, phone, state, zip, name, lebel } = inputValue;
            setLoading(true);

            const AddressData = {
                address: address,
                city: city,
                country: country,
                email: userEmail,
                name: name,
                phone: phone,
                state: state,
                zip: zip,
                level: lebel
            }

            const response = await fetch(addAddressUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(AddressData),
            });
            const data = await response.json();

            console.log(data);

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
            } else {
                Swal.fire({
                    position: 'center',
                    timerProgressBar: true,
                    title: 'Successfully Added!',
                    iconColor: '#ED1C24',
                    toast: true,
                    icon: 'success',
                    showClass: {
                        popup: 'animate__animated animate__fadeInRight',
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutRight',
                    },
                    showConfirmButton: false,
                    timer: 3500,
                });
                setLoading(false);
                refetchUserAdddress()
            }

        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <Modal title="Add Address" open={isAddressModalOpen} okButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
                <div className="container w-full my-6">
                    <div className='flex gap-4 flex-col'>
                        <div
                            className='border-2 border-gray-300 rounded-md p-2'
                        >
                            <input type="text"
                                placeholder='Concerned Person'
                                className='border-2 border-gray-300 rounded-md p-2'
                                {...register("name")}
                            />
                        </div>
                        <div
                            className='border-2 border-gray-300 rounded-md p-2'
                        >
                            <input type="text"
                                placeholder='Home/Office/Hostel etc.'
                                className='border-2 border-gray-300 rounded-md p-2'
                                {...register("lebel")}
                            />
                        </div>
                        <div
                            className='border-2 border-gray-300 rounded-md p-2'
                        >
                            <input type="text"
                                placeholder='Address'
                                className='border-2 border-gray-300 rounded-md p-2'
                                {...register("address")}
                            />
                        </div>

                        <div
                            className='border-2 border-gray-300 rounded-md p-2'
                        >
                            <input type="text"
                                placeholder='City'
                                className='border-2 border-gray-300 rounded-md p-2'
                                {...register("city")}
                            />
                        </div>


                        <div
                            className='border-2 border-gray-300 rounded-md p-2'
                        >
                            <input type="text"
                                placeholder='Country'
                                className='border-2 border-gray-300 rounded-md p-2'
                                {...register("country")}
                            />
                        </div>

                        <div className='border-2 border-gray-300 rounded-md p-2'>
                            <input type="text"
                                placeholder='Phone'
                                className='border-2 border-gray-300 rounded-md p-2'
                                {...register("phone")}
                            />
                        </div>

                        <div className='border-2 border-gray-300 rounded-md p-2'>
                            <input type="text"
                                placeholder='State'
                                className='border-2 border-gray-300 rounded-md p-2'
                                {...register("state")}
                            />
                        </div>

                        <div className='border-2 border-gray-300 rounded-md p-2'>
                            <input type="text"
                                placeholder='Zip'
                                className='border-2 border-gray-300 rounded-md p-2'
                                {...register("zip")}
                            />
                        </div>


                        <button
                            style={{
                                marginTop: '20px',
                            }}
                            onClick={handleSubmit(onSubmit)}
                            className="common-btn"
                        >
                            {
                                loading ? 'Loading...' : 'Add Address'
                            }
                        </button>

                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AddressModal;