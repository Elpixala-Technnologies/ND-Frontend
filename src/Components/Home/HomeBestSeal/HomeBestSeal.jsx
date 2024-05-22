import React, { useContext } from 'react';
import bookImg from '@/public/banner 07.png';
import Link from 'next/link';
import useBook from '@/src/Hooks/useBook';
import Skeleton from 'react-loading-skeleton';
import { BsCart } from 'react-icons/bs';
import Image from 'next/image';
import { addToCartUrl } from '@/src/Utils/Urls/BooksUrl';
import Swal from 'sweetalert2';
import { AuthContext } from '@/src/Context/UserContext';

const HomeBestSeal = () => {
    const { bookData, isLoading } = useBook();
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-col-1 gap-8 mt-4">
            {isLoading ? (
                // Render loading skeletons while data is loading
                Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} width={400} height={600} />
                ))
            ) : (
                // Render actual data when it's available
                bookData?.slice(0, 8).map((book) => (
                    <div className="best-seal w-fit" key={book._id}>
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="card bg-white shadow-lg rounded cursor-pointer flip-card-front overflow-hidden">
                                    <div className="bg-[#e1e6e9]">
                                        <Image
                                            src={book.image[0] || bookImg}
                                            width={400}
                                            height={600}
                                            alt="Description"
                                            className="md:h-[235px] w-full h-full rounded"
                                        />
                                    </div>
                                    <div className="md:p-4 p-2 flex flex-col items-start justify-start">
                                        <h4 className="md:font-bold font-semibold text-lg md:text-xl line-clamp-2 text-start">
                                            {book.category}
                                        </h4>
                                        <h4 className="text-base md:text-[1rem] font-regular">
                                            {book.name.slice(0, 20)}
                                        </h4>
                                        <div className="flex items-center md:flex-row gap-2 md:gap-4">
                                            <h1 className="text-lg md:text-xl font-bold text-slate-900">
                                                {book.discountPercentage
                                                    ? `₹ ${book.price - (book.price * book.discountPercentage) / 100}`
                                                    : `₹ ${book.price}`}
                                            </h1>
                                            {book.discountPercentage !== "0" && (
                                                <>
                                                    <span className="text-sm md:text-base text-slate-900 line-through mt-1">
                                                        ₹ {book.price}
                                                    </span>
                                                    <span className="text-red-500 text-sm md:text-base">
                                                        {book.discountPercentage} % off
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="flip-card-back flex items-center justify-center gap-2 relative">
                                <span className='px-2 underline text-black font-semibold'>{book.name}</span>
                                   <span className="text-start line-clamp-5 px-2">{book?.description}</span>
                                   <span className='text-start px-2 bg-gray-600 rounded-md'>Author : {book?.author}</span>

                                    <div className="w-full addcart flex items-center justify-center">
                                        <button class="CartBtn"
                                         onClick={() => addToCart(book._id, book.price)}
                                        >
                                            <span class="IconContainer">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                                            </span>
                                            <p class="text">Add to Cart</p>
                                        </button>
                                    </div>

                                    <span className='absolute bottom-2 left-2 text-gray-600 cursor-pointer'>  <Link href={`/product/${book?.id}`} key={book?.id}>View Details</Link> </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default HomeBestSeal;
