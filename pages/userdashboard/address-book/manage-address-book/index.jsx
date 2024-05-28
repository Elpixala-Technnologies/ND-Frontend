import { AuthContext } from '@/src/Context/UserContext';
import useAddress from '@/src/Hooks/useAddress';
import UserdashboardLayout from '@/src/Layouts/UserDashboardLayout';
import AddressModal from '@/src/Shared/Modal/AddressModal/AddressModal';
import UpdateAddressModal from '@/src/Shared/Modal/AddressModal/UpdateAddressModal';
import { getAddressByEmailUrl } from '@/src/Utils/Urls/AddressUrl';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';


const ManageAdressBookPage = () => {
    const [isAddressModalOpen,
        setIsAddressModalOpen,] = useState(false);
    const [isUpdateAddressModalOpen,
        setIsUpdateAddressModalOpen,] = useState(false);
    const [addressDataValue, setAddressDataValue] = useState({});
    const { handeladdressDelete } = useAddress();
    const { user } = useContext(AuthContext);

    const handleAddressModal = () => {
        setIsAddressModalOpen(true);
    }

    const handleUpdateAddressModal = (addressDataValue) => {
        setIsUpdateAddressModalOpen(true);
        setAddressDataValue(addressDataValue);
    }

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

    if (UserAdddressoaded) {
        return <div>Loading...</div>;
    }


    return (
        <UserdashboardLayout>
            <div className="container">
            {UserAdddressData?.length === 0 ? (
                <div>
                    <h1 className="text-2xl font-bold mb-4">No Address Found</h1>
                </div>
            ): (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Manage Address</h1>
                </div>
            )}
                <div>
                    <button
                        onClick={handleAddressModal}
                        className="common-btn"
                    >
                        Add Address
                    </button>
                </div>
                <div
                    className='flex gap-4 flex-col my-4'
                >
                    {
                        UserAdddressData && UserAdddressData?.map((addressValueData) => {
                            return (
                                <div className='flex gap-4 flex-col my-4'>
                                    <div
                                        className='border-2 border-gray-300 rounded-md p-2'
                                    >
                                        Concerned Person :  {addressValueData.name}
                                    </div>
                                    <div
                                        className='border-2 border-gray-300 rounded-md p-2'
                                    >
                                        Lebel :  {addressValueData?.level}
                                    </div>
                                    <div
                                        className='border-2 border-gray-300 rounded-md p-2'
                                    >
                                        Address :  {addressValueData.address}
                                    </div>

                                    <div
                                        className='border-2 border-gray-300 rounded-md p-2'
                                    >
                                        City : {addressValueData.city}
                                    </div>


                                    <div
                                        className='border-2 border-gray-300 rounded-md p-2'
                                    >
                                        Country : {addressValueData.country}
                                    </div>

                                    <div className='border-2 border-gray-300 rounded-md p-2'>
                                        Phone : {addressValueData.phone}
                                    </div>
                                    <div className='border-2 border-gray-300 rounded-md p-2'>
                                        Email : {addressValueData.email}
                                    </div>

                                    <div className='border-2 border-gray-300 rounded-md p-2'>
                                        State : {addressValueData.state}
                                    </div>

                                    <div className='border-2 border-gray-300 rounded-md p-2'>
                                        Zip : {addressValueData.zip}
                                    </div>

                                    <div
                                        className='rounded-md p-2 flex flex-col md:flex-row gap-4'
                                    >
                                        <button
                                            style={{
                                                marginTop: '20px',
                                            }}
                                            onClick={
                                                () => handleUpdateAddressModal(addressValueData)
                                            }
                                            className="border-2 border-black  rounded-lg p-2 hover:text-white hover:bg-black" 
                                        >
                                            Update Address
                                        </button>

                                        <button
                                            style={{
                                                marginTop: '20px',
                                            }}
                                            onClick={
                                                () => handeladdressDelete(addressValueData?._id)
                                            }
                                            className="border-2 border-black  rounded-lg p-2 hover:text-white hover:bg-black" 
                                        >
                                            Delete Address
                                        </button>
                                    </div>

                                </div>

                            )
                        })
                    }
                </div>



            </div>

            <AddressModal
                isAddressModalOpen={isAddressModalOpen}
                setIsAddressModalOpen={setIsAddressModalOpen}
                refetchUserAdddress={refetchUserAdddress}
            />

            <UpdateAddressModal
                isUpdateAddressModalOpen={isUpdateAddressModalOpen}
                setIsUpdateAddressModalOpen={setIsUpdateAddressModalOpen}
                addressDataValue={addressDataValue}
                refetchUserAdddress={refetchUserAdddress}
            />
        </UserdashboardLayout>
    );
};

export default ManageAdressBookPage;