import Image from "next/image";
import React, { useCallback, useContext, useRef } from "react";
import bookImg from '@/public/banner 07.png';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";
import Link from "next/link";
import { NotFoundImage } from "@/src/Assets";
import useBook from "@/src/Hooks/useBook";
import { AuthContext } from "@/src/Context/UserContext";
import Swal from 'sweetalert2';
import { addToCartUrl } from '@/src/Utils/Urls/BooksUrl';

const RecomendationProduct = () => {
    const sliderRef = useRef(null);
    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    const { bookData } = useBook()

    const { user } = useContext(AuthContext);

    // Add to cart function
    const addToCart = async (id, price) => {
        try {
            if (!user) {
                localStorage.setItem('redirectTo', '/cart');
                localStorage.setItem('itemToAdd', id);
                // Redirect to login page if user is not logged in
                window.location.href = '/auth/login';
                return;
            }

            const response = await fetch(addToCartUrl(id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    book: id,
                    quantity: 1,
                    totalPrice: price,
                    email: user.email,
                    status: "unpaid"
                }),
            });

            const data = await response.json();

            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Your book has been added to the cart',
                    showConfirmButton: false,
                    timer: 1500,
                });
                // // Redirect to the cart page after adding the book to the cart
                // window.location.href = '/cart';
            } else {
                // Handle the case where adding to cart is unsuccessful
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to add the book to the cart',
                    text: data.message || 'An error occurred',
                });
            }
        } catch (error) {
            // Handle any errors that occur during the fetch
            console.error('Error adding item to cart:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while adding the book to the cart.',
            });
        }
    };

    return (
        <section className=" mx-2 relative h-full">
            <div className="title my-6 flex justify-between items-center">
                <h2 className=" text-[1rem] md:text-[1.5rem] text-center md:text-left lg:text-3xl uppercase xxs:text-2xl  text-black font-bold">
                    Recomended Product
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
                                  <SwiperSlide className="" key={book._id}>
                                    <div className="card w-full bg-gradient-to-tr from-gray-50 to-gray-300 p-6 my-4 mx-2 shadow-lg hover rounded-3xl">
                                      <div className="bg-[#e1e6e9]  ">
                                        <Image
                                          src={book?.image[0] || NotFoundImage}
                                          width={300}
                                          height={400}
                                          alt={book?.name}
                                          className="md:h-[360px] h-[350px] rounded"
                                        />
                                      </div>

                                      <div className="pb-4 text-left">
                                        <Link
                                          href={`/product/${book?._id}`}
                                          className="cursor-pointer"
                                        >
                                          <h4 className="font-bold mt-2">
                                            {book.category}
                                          </h4>
                                          <h4 className="text-lg">
                                            {book?.name?.slice(0, 28) + ".."}
                                          </h4>
                                        </Link>
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
                                              ? `₹ ${
                                                  book?.price -
                                                  (book?.price *
                                                    book?.discountPercentage) /
                                                    100
                                                }`
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

                                        <div className="w-full flex items-center justify-start mt-2 hoverButton">
                                          <button
                                            onClick={() =>
                                              addToCart(book._id, book.price)
                                            }
                                          >
                                            <span className="shadow"></span>
                                            <span className="edge"></span>
                                            <span className="front text">
                                              {" "}
                                              Buy Now
                                            </span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </SwiperSlide>
                                );
                            })}
                    </div>
                </Swiper>
            </div>
        </section>
    );
};

export default RecomendationProduct;