import React, { useCallback, useContext, useRef } from "react";
// @ts-ignore
import bookImg from '@/public/banner 07.png';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";
import Link from "next/link";
import useBook from "@/src/Hooks/useBook";
import Skeleton from 'react-loading-skeleton'; // Import the Skeleton component
import Image from "next/image";
import { addToCartUrl } from '@/src/Utils/Urls/BooksUrl';
import Swal from 'sweetalert2';
import { AuthContext } from '@/src/Context/UserContext';
import { FaLongArrowAltRight } from "react-icons/fa";

const PlayWithWrite = () => {
  const { bookData, isLoading } = useBook();

  const sliderRef = useRef(null);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const filterBookData = bookData?.filter((data) => {
    return data.category === "Play Way Writing";
  });

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
    <section className=" mx-2 relative h-full  rounded-xl">
      <div className="inline-flex items-center justify-center w-full px-5">
        <hr className="w-full h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
        <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
          <h2 className="font-bold text-3xl"> Play Way Write</h2>
        </div>

      </div>

      <div className="h-full px-4">
        {isLoading ? (
          // Render loading skeletons while data is loading
          <div className="grid grid-cols-1 justify-center items-center mx-auto md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton width={400} height={600} />
            <Skeleton width={400} height={600} />
            <Skeleton width={400} height={600} />
          </div>
        ) : (
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
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            spaceBetween={32}
            slidesPerView={4}
            onSlideChange={() => { }}
            onSwiper={(swiper) => { }}
            pagination={{
              clickable: true,
              renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
              },
            }}
          >
            <div className="flex justify-center items-center">
              {filterBookData &&
                filterBookData.map((book) => (
                  <SwiperSlide className="py-5 w-fit" key={book.id}>
                    <div className="playWithWrite ">
                      <div className="bg-white pb-6 cursor-pointer flex flex-col items-start rounded shadow-lg shadow-gray-400">
                        <div className="bg-transparent w-full h-2/3 rounded-3xl">
                          <img
                            src={book?.image[0] || bookImg}
                            alt="Description"
                            className="rounded-3xl p-5"
                          />
                          <div className="w-full addcart flex items-start justify-start pl-5">
                            <button
                              className="CartBtn"
                              onClick={() => addToCart(book._id, book.price)}
                            >
                              <span className="IconContainer">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="1em"
                                  viewBox="0 0 576 512"
                                  fill="rgb(255, 255, 255)"
                                  className="cart"
                                >
                                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                                </svg>
                              </span>
                              <p className="text ">Add to Cart</p>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 text-start flex flex-col items-center justify-start w-full pb-4 gap-4 pt-2">
                        <Link href={`/product/${book?.id}`} className="flex flex-col gap-4">
                          <h4 className="font-bold line-clamp-1">{book.category}</h4>
                          <h4 className="text-[1rem] font-regular line-clamp-1">
                            {book?.name}
                          </h4>
                        </Link>

                        <div className="flex items-center md:flex-row gap-2 md:gap-4">
                          <h1 className="text-lg md:text-xl font-bold text-slate-900">
                            {book?.discountPercentage
                              ? `₹ ${book?.price -
                              (book?.price * book?.discountPercentage) / 100}`
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
                  </SwiperSlide>
                ))}
            </div>
            
            <div className="pagination-container relative space-y-10 ">
              <div className="w-full border-b border-gray-300 py-5"></div>

              <div className="absolute right-0 bottom-0 my-2">
                <Link href="/product?categoryName=Play%20Way%20Writing" className="flex items-center gap-2 cursor-pointer font-semibold">
                  View all product <FaLongArrowAltRight className="text-3xl font-light" />
                </Link>
              </div>
            </div>
          </Swiper>


        )}
        {/* <div className="flex  items-center justify-center gap-10 top-0">
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
        </div> */}
      </div>
    </section>
  );
};

export default PlayWithWrite;
