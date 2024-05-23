import Image from 'next/image';
import React, { useContext } from 'react';
import bookImg from '@/public/banner 07.png';
import { BsJournalBookmark } from 'react-icons/bs';
import Link from 'next/link';
import useBook from '@/src/Hooks/useBook';
import { addToCartUrl } from '@/src/Utils/Urls/BooksUrl';
import Swal from 'sweetalert2';
import { AuthContext } from '@/src/Context/UserContext';

const HomeAddCard = () => {
    const { bookData } = useBook();
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
        <>
            <h1 className="text-3xl font-semibold mt-12">Book of the year</h1>
            <p className="text-gray-600 md:w-[700px] mt-2">
                ND is a leading global provider of e-books for libraries and schools. Our mission is simple: to create the best content for our customers around the world. We are a team of passionate people who work hard, have fun, and are committed to helping our customers succeed.
            </p>
            <div className='grid md:grid-cols-1 lg:grid-cols-2 gap-6 py-8'>
                {
                    bookData && bookData.slice(0, 2).map(book => {
                        return (
                            <div className="cart bg-gray-100 rounded-2xl flex md:flex-row flex-col items-center gap-6 p-6 cursor-pointer  md:transform md:hover:-translate-y-1 md:hover:scale-100 hover shadow">
                                <Image src={book?.image[0] || bookImg} className='md:w-[180px] rounded-xl md:h-[230px]' width={300} height={400} />
                                <div className="info flex flex-col items-start">
                                    <div className="flex items-center gap-2">
                                        <BsJournalBookmark className='text-3xl' />
                                        <h3 className="text-lg font-semibold">
                                            {book?.name}
                                        </h3>
                                    </div>
                                    <h6 className=" font-semibold mt-2">
                                        {book?.author}
                                    </h6>
                                    <small className="mt-2 text-gray-600 w-auto flex">
                                        {book?.description.slice(0, 300)}
                                    </small>




                                    <div className="flex items-center mt-8 justify-between">
                                        <h2 className="text xl font-semibold">₹ {book?.price}</h2>
                                        <div className='flex gap-2 items-center'>
                                        <button class="btn" onClick={() => addToCart(book._id, book.price)}>Add to cart</button>
                                        <Link href={`/product/${book?._id}`}>
                                            <button className='px-12 py-2 rounded-lg text-white bg-[#1e89d1]'>Details</button>
                                        </Link>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
};

export default HomeAddCard;