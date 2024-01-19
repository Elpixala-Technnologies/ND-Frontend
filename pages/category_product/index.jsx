import {
    BannerSevenImage,
    MobileBannerOneImage,
} from '@/src/Assets';
import useBook from '@/src/Hooks/useBook';
import RootLayout from '@/src/Layouts/RootLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";
import { NotFoundImage } from "@/src/Assets";

const category_product = () => {
    const { bookData } = useBook()
    const router = useRouter();
    const categoryName = router.query.CategoryName;
    const filterBookData = bookData?.filter((data) => {
        return data.category === categoryName;
    });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Define your mobile breakpoint
        };

        handleResize(); // Check the initial screen width
        window.addEventListener("resize", handleResize); // Listen for window resize events

        return () => {
            window.removeEventListener("resize", handleResize); // Remove the event listener when the component unmounts
        };
    }, []);

    // ========== 
    const sliderRef = useRef(null);
    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);


    return (
        <RootLayout>
            <div className="md:container">
                <Image
                    src={isMobile ? MobileBannerOneImage : BannerSevenImage}
                    alt="Banner Image"
                    className="w-full h-full"
                    width={isMobile ? 768 : 1920}
                    height={isMobile ? 768 : 500}
                />
                <br />
                <h3 className='font-semibold md:text-3xl text-lg'>Category {categoryName}</h3>
                <div className="grid md:grid-cols-4  md:gap-4 gap-2 mt-4">
                    {
                        filterBookData?.map(book => (
                            <Link href={`/product/${book?._id}`}>
                                <div className="card bg-white px-3 pt-2 pb-[20px]  shadow-lg rounded hover">
                                    <div className="bg-[#e1e6e9]">
                                        <Image
                                            src={book?.image[0] || NotFoundImage}
                                            width={400}
                                            height={350}
                                            alt="Description"
                                            className='md:h-[350px] h-full w-full rounded'
                                        />
                                    </div>

                                    <div className="pb-4 text-left">
                                        <h4 className='font-bold my-2'>
                                            {book.category}
                                        </h4>
                                        <h4 className="">{book?.name?.slice(0, 24) + ".."}</h4>
                                        {/* <div className='flex items-center gap-4'>
                                            <h1 className="text-xl font-bold text-slate-900">
                                                {
                                                    book?.discountPercentage
                                                        ? `₹ ${book?.price - (book?.price * book?.discountPercentage) / 100}`
                                                        : `₹ ${book?.price}`
                                                }
                                            </h1>
                                            <span className="text-sm text-slate-900 line-through mt-1">
                                                ₹ {book?.price}
                                            </span>
                                            <span className='text-[#eec75b]'>
                                                {book?.discountPercentage} % off
                                            </span>
                                        </div> */}
                                        <div className="flex items-center md:flex-row gap-2 md:gap-4">
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
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <section className=" mx-2 relative h-full">
                    <div className="title my-6 flex justify-between items-center">
                        <h2 className=" text-[1rem] md:text-[1.5rem] text-center md:text-left lg:text-3xl uppercase xxs:text-2xl  text-black font-bold">
                            Best Seller
                        </h2>

                        <div className="flex  items-center gap-10 top-0">
                            <button
                                className="prev-arrow cursor-pointer bg-[#ED1C24] p-3 rounded-full"
                                onClick={handlePrev}
                            >
                                <TbArrowBigLeft className="h-6 w-6 text-white" />
                            </button>
                            <button
                                className="next-arrow cursor-pointer bg-[#ED1C24] p-3 rounded-full"
                                onClick={handleNext}
                            >
                                <TbArrowBigRight className="h-6 w-6 text-white" />
                            </button>
                        </div>
                    </div>

                    <div className="h-full">
                        <Swiper
                            ref={sliderRef}
                            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                360: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                480: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 40,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 30,
                                },
                            }}
                            spaceBetween={50}
                            slidesPerView={3}
                            onSlideChange={() => { }}
                            onSwiper={(swiper) => { }}
                        >
                            <div className="grid grid-cols-1 justify-center items-center mx-auto md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {bookData &&
                                    bookData.map((book) => {
                                        return (
                                            <SwiperSlide className="cursor-grab" key={book._id}>
                                                <Link href={`/product/${book?._id}`}>
                                                    <div className="card w-full bg-white px-3 py-2 my-4 mx-2 shadow-lg hover rounded cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100">
                                                        <div className="bg-[#e1e6e9]  ">
                                                            <Image
                                                                src={book?.image[0] || NotFoundImage}
                                                                width={300}
                                                                height={400}
                                                                alt={book?.name}
                                                                className='md:h-[360px] h-[350px] rounded'
                                                            />
                                                        </div>

                                                        <div className="pb-4 text-left">
                                                            <h4 className='font-bold my-2'>
                                                                {book.category}
                                                            </h4>
                                                            <h4 className="text-lg">{book?.name?.slice(0, 28) + ".."}</h4>
                                                            {/* <div className='flex items-center gap-4'>
                                                        <h1 className="text-xl font-bold text-slate-900">
                                                            {
                                                                book?.discountPercentage
                                                                    ? `₹ ${book?.price - (book?.price * book?.discountPercentage) / 100}`
                                                                    : `₹ ${book?.price}`
                                                            }
                                                        </h1>
                                                        <span className="text-sm text-slate-900 line-through mt-1">
                                                            ₹ {book?.price}
                                                        </span>
                                                        <span className='text-[#eec75b]'>
                                                            {book?.discountPercentage} % off
                                                        </span>
                                                    </div> */}
                                                            <div className="flex items-center md:flex-row gap-2 md:gap-4">
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
                                                    </div>
                                                </Link>
                                            </SwiperSlide>
                                        );
                                    })}
                            </div>
                        </Swiper>
                    </div>
                </section>
            </div>
        </RootLayout>
    );
};

export default category_product;