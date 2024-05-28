import { AuthContext } from '@/src/Context/UserContext';
import useAddress from '@/src/Hooks/useAddress';
import { updateAddressUrl } from '@/src/Utils/Urls/AddressUrl';
import { Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";


const ProfileModal = ({
    isUpdateAddressModalOpen,
    setIsUpdateAddressModalOpen,
    addressDataValue,
    refetchUserAdddress
}) => {
    const handleCancel = () => {
        setIsUpdateAddressModalOpen(false);
    }
    const [mobile, setmobile] = useState("");
    const [isError, setIsError] = useState(false);

    const { handleSubmit, register, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const userEmail = user?.email;

    const {
        address,
        city,
        country,
        phone,
        state,
        zip,
        _id,
        name, level
    } = addressDataValue;

    const onSubmit = async (inputValue) => {
        try {
            const { address, city, country, state, zip , name, level} = inputValue;
            setLoading(true);

            const response = await fetch(updateAddressUrl(_id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address,
                    city,
                    country,
                    phone: mobile,
                    state,
                    zip,
                    name,
                    level
                }),
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
                    timer: 1500,
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
                    timer: 1500,
                });
                refetchUserAdddress();
                setLoading(false);
                handleCancel();
            }

        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };



    return (
        <Modal title="Update Address" open={isUpdateAddressModalOpen} okButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
            <div className="container">
                <div className='flex gap-4 flex-col'>
                   
                    <div
                        className='border-2 w-full border-gray-300 rounded-md p-2'
                    >
                        <input type="text"
                            placeholder='Address'
                            className='border-2 w-full border-gray-300 rounded-md p-2'
                            defaultValue={address}
                            {...register("address")}
                        />
                    </div>

                    <div
                        className='border-2 w-full border-gray-300 rounded-md p-2'
                    >
                        <input type="text"
                            placeholder='City'
                            className='border-2 w-full border-gray-300 rounded-md p-2'
                            defaultValue={city}
                            {...register("city")}
                        />
                    </div>


                    <div
                        className='border-2 w-full border-gray-300 rounded-md p-2'
                    >
                        <input type="text"
                            placeholder='Country'
                            className='border-2 w-full border-gray-300 rounded-md p-2'
                            defaultValue={country}
                            {...register("country")}
                        />
                    </div>

                    {/* <div className='border-2 w-full border-gray-300 rounded-md p-2'>
                        <input type="text"
                            placeholder='Phone'
                            className='border-2 w-full border-gray-300 rounded-md p-2'
                            defaultValue={phone}
                            {...register("phone")}
                        />
                    </div> */}

                    <div>
                      <TextField
                          type="tel"
                          error={isError}
                          value={mobile}
                          style={{"width": "100%"}}
                          label="Enter Phone Number"
                          onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d{0,10}$/.test(value)) {
                                  setmobile(value);
                                  setIsError(value.length !== 10);
                              }
                          }}
                          InputProps={{
                              startAdornment: (
                                  <InputAdornment position="start">
                                      +91
                                  </InputAdornment>
                              ),
                          }}
                      />
                      <h3>
                          Your Mobile Number is:
                          {isError ? " Invalid" : " +91" + mobile}
                      </h3>
                  </div>

                    <div className='border-2 w-full border-gray-300 rounded-md p-2'>
                        <input type="text"
                            placeholder='State'
                            className='border-2 w-full border-gray-300 rounded-md p-2'
                            defaultValue={state}
                            {...register("state")}
                        />
                    </div>

                    <div className='border-2 w-full border-gray-300 rounded-md p-2'>
                        <input type="text"
                            placeholder='Zip'
                            className='border-2 w-full border-gray-300 rounded-md p-2'
                            defaultValue={zip}
                            {...register("zip")}
                        />
                    </div>

                    <button
                        style={{
                            marginTop: '20px',
                        }}
                        onClick={handleSubmit(onSubmit)}
                        className="border-2 border-black  rounded-lg p-2 hover:text-white hover:bg-black" 
                    >
                        {
                            loading ? 'Loading...' : 'Update '
                        }
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ProfileModal;