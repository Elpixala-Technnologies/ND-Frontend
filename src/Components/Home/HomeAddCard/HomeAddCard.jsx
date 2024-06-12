import Image from 'next/image';
import React, { useContext } from 'react';
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
      <h1 className="text-3xl font-bold mt-12 sm:mx-0 mx-4">Book of the year</h1>
      <div className='flex sm:flex-row flex-col my-5 sm:items-center items-start gap-10 sm:mx-0 mx-4'>

        <div className="md:w-1/2 text-left sm:mx-0 mx-4">
          {bookData &&
            bookData.slice(0, 2).map((book, index, array) => {
              return (
                <div key={book?.name}>
                  <h1 className="sm:text-4xl text-2xl font-bold mb-4 font-serif">{book?.name}</h1>
                  {index === 0 && array.length > 1 && (
                    <span className="sm:text-4xl text-2xl font-bold mb-4 font-serif"> & </span>
                  )}
                </div>
              );
            })}

          {bookData && bookData.length > 0 && (
            <h3 className="text-2xl font-bold text-gray-500 mb-4 font-serif">
              the no.1 sunday times bestseller
            </h3>
          )}

          {bookData && bookData.length > 0 && (
            <p className="text-lg mb-4 font-body">{bookData[0]?.description}</p>
          )}

          <Link href="/product" className="text-blue-500 hover:underline font-body">
            VIEW MORE
          </Link>
        </div>

        <div className='flex flex-col gap-4 w-1/2 sm:mx-0 mx-4'>
          {
            bookData && bookData.slice(0, 2).map(book => {
              return (
                <div className="  bg-gray-100 rounded-2xl sm:w-full w-80 h-full flex md:flex-row flex-col items-center gap-6 p-6 cursor-pointer  md:transform md:hover:-translate-y-1 md:hover:scale-100 hover shadow" key={book?._id}>
                  <Image
                    src={book?.image[0]}
                    className="md:w-[180px] rounded-xl md:h-[230px]"
                    alt={book?.name}
                    width={300}
                    height={400}
                  />
                  <div className="info flex flex-col items-start">
                    <div className="flex items-center gap-2">
                      <BsJournalBookmark className="text-3xl" />
                      <h3 className="text-lg font-semibold">
                        {book?.name}
                      </h3>
                    </div>
                    <h6 className=" font-semibold mt-2">
                      {book?.author}
                    </h6>
                    <small className="mt-2 text-gray-600 w-fit flex ">
                      {book?.description.slice(0, 300)}
                    </small>

                    <div className="flex items-center mt-8 justify-between">
                      <h2 className="text xl font-semibold">
                        ₹ {book?.price}
                      </h2>
                      <div className="flex gap-2 items-center">
                        <button
                          className="btn"
                          onClick={() =>
                            addToCart(book._id, book.price)
                          }
                        >
                          Add to cart
                        </button>
                        <Link href={`/product/${book?._id}`}>
                          <button className="px-12 py-2 rounded-lg text-white bg-[#1e89d1]">
                            Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>

      </div>
    </>
  );
};

export default HomeAddCard;