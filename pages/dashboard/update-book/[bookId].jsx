import useBook from '@/src/Hooks/useBook';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import AdminAccessRoute from '@/src/PrivetRoute/AdminAccessRoute';
import { getSingelBookUrl, updateBooksUrl } from '@/src/Utils/Urls/BooksUrl';
import { Button, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const UpdateBookPage = () => {
    const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
    const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;

    const router = useRouter();
    const { bookId } = router.query;
    const [singelBookData, setSingelBookData] = useState({});
    const [couponSelected, setCouponSelected] = useState([]);
    const { categoryData, levelData, couponData } = useBook()
    const {
        register,
        handleSubmit,
        setValue, // Add setValue from useForm
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [featuresValue, setFeaturesValue] = useState([]);

    const couponOptions = couponData?.map((couponResponse) => {
        const { _id, coupon } = couponResponse;
        return {
            value: coupon,
            label: coupon,
        }
    })

    const handelCouponChange = (value) => {
        setCouponSelected(value);
    }

    useEffect(() => {
        if (bookId) {
            const getBook = async () => {
                const reqBook = await fetch(getSingelBookUrl(bookId));
                const resBook = await reqBook.json();
                setSingelBookData(resBook?.data);
                console.log(resBook);
            }
            getBook();
        }
    }, [bookId]);


    const {
        category,
        name,
        price,
        quantity,
        discountPercentage,
        description,
        language,
        level,
        cover,
        features,
        author,
        coupon,
        image,
        _id
    } = singelBookData;

    useEffect(() => {
        setValue("bookName", name);
        setValue("bookCategory", category);
        setValue("bookPrice", price);
        setValue("bookDiscountPercentage", discountPercentage);
        setValue("bookAuthor", author);
        setValue("bookCover", cover);
        setValue("levelOption", level);
        setValue("bookQuantity", quantity);
        setValue("language", language);
        setValue("bookDescription", description);
        setValue("bookFeatures", features?.join(', ')); // Join the features array into a string
        setValue("coupon", coupon);

    }, [name, category, price, discountPercentage, author, cover, level, quantity, language, description, features, coupon, setValue]);

    const [imageFiles, setImageFiles] = useState([]);
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const updatedFiles = selectedFiles.map((file) => {
            const publicId = `${cloud_folder}/${file.name.replace(/\s+/g, '_')}`;
            file.uploadPreset = publicId;
            return file;
        });
        setImageFiles(updatedFiles);
    };

    const onSubmit = async (valueData) => {
        try {
            setLoading(true);
            let featuresArray; // Declare it in a higher scope

            const uploadedUrls = [];

            // Check if new images are uploaded
            if (imageFiles.length > 0) {
                for (const imageFile of imageFiles) {
                    const formData = new FormData();
                    formData.append('file', imageFile);
                    formData.append(
                        'upload_preset',
                        `${cloud_folder}/Books/${imageFile?.name}`
                    );
                    formData.append('upload_preset', upload_preset);
                    formData.append('cloud_name', cloud_name);

                    const imgRes = await fetch(cloud_api, {
                        method: 'POST',
                        body: formData,
                    });

                    if (!imgRes.ok) {
                        const errorResponse = await imgRes.text();
                        throw new Error(
                            `Error uploading image: ${imgRes.status} - ${imgRes.statusText}\n${errorResponse}`
                        );
                    }

                    const imgdata = await imgRes.json();
                    const imgurl = imgdata?.secure_url;
                    if (imgurl) {
                        uploadedUrls.push(imgurl);
                    } else {
                        throw new Error(
                            'Failed to retrieve the image URL from Cloudinary response.'
                        );
                    }
                }
            } else {
                // No new images uploaded, use the existing image URLs
                uploadedUrls.push(...(image || []));
            }


            // Split the features string into an array
            if (typeof valueData.bookFeatures === 'string') {
                featuresArray = valueData.bookFeatures.split(',');
                // Use featuresArray as needed
            } else {
                featuresArray = valueData.bookFeatures;
            }

            const bookUpdateData = {
                name: valueData.bookName,
                category: valueData.bookCategory,
                price: valueData.bookPrice,
                quantity: valueData.bookQuantity,
                discountPercentage: valueData.bookDiscountPercentage,
                description: valueData.bookDescription,
                language: valueData.language,
                level: valueData.levelOption,
                cover: valueData.bookCover,
                features: featuresArray, // Use the converted array
                author: valueData.bookAuthor,
                coupon: couponSelected,
                image: uploadedUrls || image, // Use the uploadedUrls if available, otherwise the existing images
            };

            const res = await fetch(updateBooksUrl(bookId), {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookUpdateData),
            });

            const dataRes = await res.json();

            if (!res.ok) {
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
                    title: "Successfully Updated",
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
            }

            setLoading(false);
        } catch (error) {
            console.error('Error updating book:', error);
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <AdminAccessRoute>
                <section>
                    <div>
                        <h1>
                            Update Book
                        </h1>
                    </div>
                    <section className="my-4">
                        <div className="flex flex-col w-full gap-4 mx-auto add-book-form">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col w-full gap-4 mx-auto add-book-form md:w-full "
                            >
                                <input
                                    placeholder="Book Name"
                                    name="bookName"
                                    type="text"
                                    className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                                    defaultValue={name}
                                    {...register("bookName")}
                                />

                                <select
                                    className='p-2 border-2 border-gray-300 rounded-md'
                                    {...register("bookCategory")}
                                    defaultValue={category}
                                >
                                    <option>
                                        {category || 'Select Category'}
                                    </option>
                                    {categoryData && categoryData.map((categoryResponse) => {
                                        const { _id, category } = categoryResponse;
                                        return (
                                            <option
                                                value={category}
                                                className='p-4 my-2 border-2 border-gray-300 rounded-md'
                                                key={_id}
                                            >{category}</option>
                                        )
                                    })}
                                </select>

                                <input
                                    placeholder="Price"
                                    name="price"
                                    type="text"
                                    className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                                    defaultValue={price}
                                    {...register("bookPrice")}
                                />
                                <input
                                    placeholder="Discount Percentage"
                                    name="discountPercentage"
                                    className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                                    type="text"
                                    defaultValue={discountPercentage}
                                    {...register("bookDiscountPercentage")}
                                />
                                <input
                                    placeholder="Author"
                                    type="text"
                                    name="author"
                                    className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                                    defaultValue={author}
                                    {...register("bookAuthor")}
                                />
                                <input
                                    placeholder="Cover"
                                    className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                                    type="text"
                                    name="cover"
                                    defaultValue={cover}
                                    {...register("bookCover")}
                                />

                                <select
                                    {...register("levelOption")}
                                    className='p-2 border-2 border-gray-300 rounded-md'
                                    defaultValue={level}
                                >
                                    <option value="">
                                        {level || 'Select Level'}
                                    </option>
                                    {levelData && levelData?.map((levelResponse) => {
                                        const { _id, level } = levelResponse;
                                        return (
                                            <option
                                                value={level}
                                                className='p-4 my-2 border-2 border-gray-300 rounded-md'
                                                key={_id}
                                            >{level}</option>
                                        )
                                    })}
                                </select>

                                <Select
                                    mode="multiple"
                                    style={{
                                        width: '100%',
                                    }}
                                    defaultValue={
                                        coupon
                                    }
                                    defaultOpen={true}
                                    onChange={handelCouponChange}
                                    options={couponOptions}
                                />

                                <input
                                    placeholder="Quantity"
                                    className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                                    type="text"
                                    name="quantity"
                                    defaultValue={quantity}
                                    {...register("bookQuantity")}
                                />
                                <input
                                    placeholder="Language"
                                    className=" border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                                    type="text"
                                    name="language"
                                    defaultValue={language}
                                    {...register("language")}
                                />
                                <textarea id="txtid" name="txtname" rows="4" cols="50" maxLength="200"
                                    placeholder="Description"
                                    defaultValue={description}
                                    {...register("bookDescription")}
                                    className="border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                                >
                                </textarea>
                                <textarea name="txtname" rows="4" cols="50" maxLength="200"
                                    defaultValue={features}
                                    {...register("bookFeatures", {
                                        setValueAs: (value) => {
                                            // Split the value into an array
                                            const featuresArray = value.split(',');
                                            // Set the value as the array
                                            return featuresArray;
                                        }
                                    })}
                                    className="border-[2px] border-[#000] text-[15px] font-[500] text-gray-700 outline-none w-full rounded-lg shadow-md pl-10 pr-2.5 py-3"
                                >
                                </textarea>
                                <div className="w-full h-full">
                                    <div className="p-4 rounded-lg shadow-xl bg-gray-50">
                                        <label className="inline-block mb-2 text-gray-500">Upload book Image</label>
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col w-full h-32 max-w-xs border-4 border-blue-200 border-dashed md:max-w-md hover:bg-gray-100 hover:border-gray-300">
                                                <div className="flex flex-col items-center justify-center pt-7">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        />
                                                    </svg>
                                                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                        Attach file{' '}
                                                    </p>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="px-4 pb-4"
                                                    name="images"
                                                    accept="image/*"
                                                    defaultValue={image}
                                                    multiple
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center justify-center gap-4 my-4">
                                            {image && image?.map((uploadedImageUrl, index) => (
                                                <div key={index} className="relative flex flex-col overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
                                                    <a
                                                        className="relative flex mx-3 mt-3 overflow-hidden h-60 rounded-xl"
                                                        href="#"
                                                    >
                                                        <img
                                                            className=""
                                                            src={uploadedImageUrl}
                                                            alt="book image"
                                                        />
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        {/* show selected image  */}
                                        {
                                            imageFiles?.map((image, index) => (
                                                <div key={index} className="relative flex flex-col overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
                                                    <a
                                                        className="relative flex mx-3 mt-3 overflow-hidden h-60 rounded-xl"
                                                        href="#"
                                                    >
                                                        <img
                                                            className=""
                                                            src={URL.createObjectURL(image)}
                                                            alt="book image"
                                                        />
                                                    </a>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <Button type="default" htmlType="submit" style={{
                                    marginTop: '20px',
                                }}>
                                    {
                                        loading ? 'Loading...' : 'Update Book'
                                    }
                                </Button>
                            </form>
                        </div>
                    </section>
                </section>
            </AdminAccessRoute>
        </DashboardLayout>
    );
};

export default UpdateBookPage;
