import useBook from '@/src/Hooks/useBook';
import React, { useContext } from 'react';
import { addToCartUrl } from '@/src/Utils/Urls/BooksUrl';
import Swal from 'sweetalert2';
import { AuthContext } from '@/src/Context/UserContext';

const BookComponent = () => {
    const { bookData, isLoading } = useBook();
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };
    const randomBooks = Array.isArray(bookData) ? shuffleArray([...bookData]).slice(0, 4) : [];

    const findBookWithHighestDiscount = (books) => {
        let highestDiscountBook = null;
        let highestDiscount = -1;

        books?.forEach((book) => {
            const discount = parseInt(book.discountPercentage);
            if (discount > highestDiscount) {
                highestDiscount = discount;
                highestDiscountBook = book;
            }
        });

        return highestDiscountBook;
    };

    const highestDiscountBook = findBookWithHighestDiscount(bookData);

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

    const sliceBookName = (name, maxLength) => {
        if (name?.length > maxLength) {
            return name.slice(0, maxLength) + '...';
        }
        return name;
    };

    return (
        <div className="p-8 flex border border-gray-300 rounded-md ">

            <div className="flex flex-col justify- items-center w-1/2 mx-4">
                <div className="flex flex-col items-center">
                    <div className="hoverCard p-4">

                        <div className="container noselect">
                            <div className="canvas">
                                <div className="tracker tr-1"></div>
                                <div className="tracker tr-2"></div>
                                <div className="tracker tr-3"></div>
                                <div className="tracker tr-4"></div>
                                <div className="tracker tr-5"></div>
                                <div className="tracker tr-6"></div>
                                <div className="tracker tr-7"></div>
                                <div className="tracker tr-8"></div>
                                <div className="tracker tr-9"></div>
                                <div className="tracker tr-10"></div>
                                <div className="tracker tr-11"></div>
                                <div className="tracker tr-12"></div>
                                <div className="tracker tr-13"></div>
                                <div className="tracker tr-14"></div>
                                <div className="tracker tr-15"></div>
                                <div className="tracker tr-16"></div>
                                <div className="tracker tr-17"></div>
                                <div className="tracker tr-18"></div>
                                <div className="tracker tr-19"></div>
                                <div className="tracker tr-20"></div>
                                <div className="tracker tr-21"></div>
                                <div className="tracker tr-22"></div>
                                <div className="tracker tr-23"></div>
                                <div className="tracker tr-24"></div>
                                <div className="tracker tr-25"></div>
                                <div id="card">
                                    <p id="prompt">
                                        <span className='w-full text-black'>{`${highestDiscountBook?.name.split(' ').join('\u00A0').slice(0, 20)}`}</span><br />
                                        <span className='w-full text-black'>{`${highestDiscountBook?.author.split(' ').join('\u00A0').slice(0, 20)}`}</span>

                                    </p>
                                    <div className="title p-2">

                                    </div>
                                    <div className="subtitle pb-20 p-4">
                                        <img src={highestDiscountBook?.image[0]} alt="book" className='rounded-3xl' />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">{sliceBookName(highestDiscountBook?.name, 20)}- <b className='text-red-500'> {highestDiscountBook?.discountPercentage}% Discount</b></h2>
                    <button className="bg-black text-white py-2 px-4 rounded" onClick={() => addToCart(highestDiscountBook?._id, highestDiscountBook?.price)}>BUY NOW</button>
                </div>
            </div>
            <div className="flex w-1/2">
                <div className="w-full flex items-center">
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                        {randomBooks.map((book, index) => (
                            <div key={index} className="border p-2 flex gap-1">
                                <div className="w-full h-48 bg-gray-300 mb-2" style={{ backgroundImage: `url(${book.image[0]})`, backgroundSize: 'cover' }}></div>
                                <div className='w-full flex flex-col items-start justify-center'>
                                    <h4 className="font-bold line-clamp-2">{book.name}</h4>
                                    <p>{book.author}</p>
                                    <div className="flex items-center md:flex-row gap-2 md:gap-4">
                                        <h1 className="text-lg md:text-xl font-bold text-slate-900">
                                            {book.discountPercentage
                                                ? `₹ ${book.price - (book.price * book.discountPercentage) / 100}`
                                                : `₹ ${book.price}`}
                                        </h1>
                                    </div>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 .587l3.668 7.431L24 9.587l-6 5.847 1.4 8.173L12 18.651l-7.4 4.956L6 15.434 0 9.587l8.332-1.569z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <div className="w-full flex items-center justify-start mt-2 hoverButton">
                                        <button onClick={() => addToCart(book._id, book.price)}>
                                            <span className="shadow"></span>
                                            <span className="edge"></span>
                                            <span className="front text"> Buy Now
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookComponent;
