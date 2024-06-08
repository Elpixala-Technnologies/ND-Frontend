import useBook from '@/src/Hooks/useBook';
import Link from 'next/link';
import React, { useState } from 'react'
import { IoArrowForwardCircle } from 'react-icons/io5';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const HeroSection = () => {
    const { bookData, isLoading } = useBook();
    const [currentIndex, setCurrentIndex] = useState(0);

    const items = [
        {
            title: "New Arrivals",
            subtitle: "Book Shop Find Your Book",
            backgroundImage: "https://images.pexels.com/photos/2781814/pexels-photo-2781814.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            title: "Latest Collection",
            subtitle: "Explore the Latest Books",
            backgroundImage: "https://images.pexels.com/photos/4144036/pexels-photo-4144036.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            title: "Best Sellers",
            subtitle: "Top Picks for You",
            backgroundImage: "https://images.pexels.com/photos/3769995/pexels-photo-3769995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
    ];

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % items.length);
    };

    const handlePrev = () => {
        setCurrentIndex((currentIndex - 1 + items.length) % items.length);
    };

    const { title, subtitle, backgroundImage } = items[currentIndex];
    return (
        <section>
            <div className="mt-10">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    {/* Left Section */}
                    <div className="flex flex-col space-y-4 w-full md:w-1/3">
                        {bookData?.slice(2, 4).reverse().map((book, index) => (
                            <div
                                key={book.id}
                                className={`group p-8 ${index === 0 ? 'bg-gradient-to-tr from-blue-50 via-white  to-blue-900' : 'bg-gradient-to-tr from-gray-200 via-white to-gray-400'} relative h-48 flex flex-col justify-between rounded-md`}>
                                <div className='flex flex-col items-start justify-start'>
                                    <img src={book?.image[0]} alt={book.title} className="w-28 h-28 absolute top-5 right-5 shadow-lg shadow-gray-600 transform transition-transform duration-300 group-hover:scale-150" />
                                    <h2 className="text-lg font-bold mt-2 ">{book?.name.slice(0, 20)}</h2>
                                    <div className="flex items-center md:flex-row gap-2 md:gap-4">
                                        <span>Prizing at </span>
                                        <h1 className="text-lg md:text-xl font-bold text-slate-900">
                                            {book?.discountPercentage
                                                ? `₹ ${book?.price - (book?.price * book?.discountPercentage) / 100}`
                                                : `₹ ${book?.price}`}
                                        </h1>
                                        {book?.discountPercentage !== "0" && (
                                            <>
                                                <span className="text-sm md:text-base text-slate-900 line-through mt-1">
                                                    ₹ {book?.price}
                                                </span>
                                                <span className="text-[#eec75b] text-sm md:text-base">
                                                    {book?.discountPercentage} % off
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <span>
                                    <Link href={`/product/${book?.id}`} key={book?.id} className='w-min'>
                                        <IoArrowForwardCircle className='text-gray-500 text-4xl' />
                                    </Link>
                                </span>

                            </div>
                        ))}
                    </div>


                    {/* Right Section */}
                    <div className="group relative flex flex-col items-start justify-center bg-white p-8 pl-20 w-2/3">
            <h1 className="text-4xl font-bold mb-4 z-10">{title}</h1>
            <h2 className="text-2xl mb-4 z-10">{subtitle}</h2>
            <button className="px-4 py-2 bg-black text-white font-semibold cursor-pointer z-10">
                <Link href="/product">SHOP NOW</Link>
            </button>

            {/* Next and Prev buttons */}
            <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2  text-black font-semibold cursor-pointer z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={handlePrev}
            >
            <IoIosArrowBack className='text-3xl'/>
                
            </button>
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2  text-black font-semibold cursor-pointer z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={handleNext}
            >
                <IoIosArrowForward className='text-3xl' />
            </button>

            {/* Background Image */}
            <div
                className="w-full h-full absolute top-0 right-0 bg-cover bg-center bg-no-repeat opacity-75 rounded-md"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
        </div>

                </div>
                {/* Footer Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-green-100 p-8 text-center rounded-md">
                        <h3 className="text-lg font-bold">Free Shipping</h3>
                        <p className="text-gray-600">FREE SHIPPING ON ALL ORDER</p>
                    </div>
                    <div className="bg-green-100 p-8 text-center rounded-md">
                        <h3 className="text-lg font-bold">Money Return</h3>
                        <p className="text-gray-600">BACK GUARANTEE UNDER 5 DAYS</p>
                    </div>
                    <div className="bg-green-100 p-8 text-center rounded-md">
                        <h3 className="text-lg font-bold">Member Discount</h3>
                        <p className="text-gray-600">ON EVERY ORDER OVER 1000 Rs</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection