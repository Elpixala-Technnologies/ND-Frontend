'use client'
import Image from 'next/image';
import { useRouter } from 'next/router';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useContext, useEffect, useState } from 'react';
import RootLayout from '@/src/Layouts/RootLayout';
import RecomendationProduct from '@/src/Components/Shop/RecomendationProduct/RecomendationProduct';
import CopuonSlider from '@/src/Components/Shop/CopuonSlider/CopuonSlider';
import useBook from '@/src/Hooks/useBook';
import { addToCartUrl } from '@/src/Utils/Urls/BooksUrl';
import Swal from 'sweetalert2';
import { AuthContext } from '@/src/Context/UserContext';
import { BsCart } from 'react-icons/bs';

const ProductDetails = () => {
  const { bookData } = useBook();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;
  const [selectedImage, setSelectedImage] = useState(null); // State variable to store the selected image URL

  let mainBookData;

  const filterBookData = bookData?.filter((data) => {
    return data._id === id;
  });

  if (filterBookData && filterBookData.length > 0) {
    mainBookData = filterBookData[0];
  } else {
    console.error(`No data found for ID: ${id}`);
  }

  const {
    category,
    name,
    price,
    discountPercentage,
    description,
    language,
    level,
    cover,
    features,
    author,
    coupon,
    image,
    _id,
  } = mainBookData || {};

  // ====== Add to cart ======

  // const addToCart = async (id) => {
  //   const convertPrice = parseInt(price);
  //   // Check if the user is logged in
  //   if (!user) {
  //     // User is not logged in, show an alert
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Please log in to add the book to your cart',
  //       showConfirmButton: true,
  //     });
  //     return;
  //   }

  //   const res = await fetch(addToCartUrl(id), {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       book: _id,
  //       quantity: 1,
  //       totalPrice: convertPrice,
  //       email: user?.email,
  //       status: "unpaid"
  //     }),
  //   });

  //   const data = await res.json();
  //   console.log(data);

  //   if (data.success) {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Your book added to cart',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     })
  //     router.push('/cart');
  //   }
  // }

  const totalPrice = parseInt(price - (price * discountPercentage) / 100)
  // Add to cart function
  const addToCart = async (id) => {
    const convertPrice = parseInt(totalPrice);
    if (!user) {
      localStorage.setItem('redirectTo', '/cart');
      localStorage.setItem('itemToAdd', id);
      router.push('/auth/login');
      return;
    }

    await addItemToCart(id, convertPrice);
  }

  const addItemToCart = async (id, price) => {
    try {
      const response = await fetch(addToCartUrl(id), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          book: _id, // Assuming _id is the ID of the book
          quantity: 1,
          totalPrice: price,
          email: user?.email,
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
        // You can redirect to the cart page or perform any other action
        router.push('/cart');
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
  }

  const postLoginRedirect = () => {
    const redirectTo = localStorage.getItem('redirectTo');
    const itemToAdd = localStorage.getItem('itemToAdd');
    if (redirectTo && itemToAdd) {
      addItemToCart(itemToAdd, /* correct price */);
      localStorage.removeItem('itemToAdd');
      router.push(redirectTo);
      localStorage.removeItem('redirectTo');
    }
  }

  useEffect(() => {
    if (user) {
      postLoginRedirect();
    }
  }, [user]);
  




  const handelBuyeNow = async (id) => {
    const convertPrice = parseInt(totalPrice);
    // Check if the user is logged in
    if (!user) {
      // User is not logged in, show an alert
      Swal.fire({
        icon: 'error',
        title: 'Please log in to add the book to your cart',
        showConfirmButton: true,
      });
      return;
    }

    const res = await fetch(addToCartUrl(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        book: _id,
        quantity: 1,
        totalPrice: convertPrice,
        email: user?.email,
        status: "unpaid"
      }),
    });

    const data = await res.json();
    console.log(data);

    if (data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Your book added to cart',
        showConfirmButton: false,
        timer: 1500,
      })
      router.push('/checkout');
    }
  }

  useEffect(() => {
    if (image && image.length > 0) {
      setSelectedImage(image[0]);
    }
  }, [image]);



  return (
    <RootLayout>
      <div className='pb-4 container h-full'>
        <div className="container mx-auto mt-3 flex justify-between items-center">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <div className="">

              <div className="img-box rounded-lg bg-gradient-to-r from-gray-100 to-gray-300 p-6 flex justify-center shadow-lg shadow-gray-400">
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt={name}
                    width={300}
                    height={300}
                    className='cursor-pointer  w-full h-full rounded-xl'
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
              <br />
              <div className='h-[15%]'>
                <Swiper
                  slidesPerView={4}
                  spaceBetween={10}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[]}
                  className="mySwiper"
                >
                  {image &&
                    image.map((img, index) => {
                      return (
                        <SwiperSlide key={index} onClick={() => setSelectedImage(img)}>
                          <Image
                            src={img}
                            alt={name}
                            width={100}
                            height={100}
                            className='bg-[#f1e8e8] p-1 rounded-lg cursor-pointer w-full h-full object-cover'
                          />
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
            <div className="md:col-span-2">
              <h1 className="text-xl font-[500] md:w-[500px]">{name}</h1>
              <br />
              <div className="flex items-center md:flex-row gap-2 md:gap-4">
                <h1 className="text-lg md:text-xl font-bold text-slate-900">
                  {discountPercentage
                    ? `₹ ${price - (price * discountPercentage) / 100}`
                    : `₹ ${price}`}
                </h1>
                {discountPercentage !== "0" && (
                  <>
                    <span className="text-sm md:text-base text-slate-900 line-through">
                      ₹ {price}
                    </span>
                    <span className="text-[#eec75b] text-sm md:text-base">
                      {discountPercentage} % off
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-400 text-sm my-4">
                {description?.slice(0, 200)}...
              </p>
              <hr />



              <div className="mt-4 flex flex-col items-center space-y-4  py-4  w-full">
                <div className='w-full'>
                  <button
                    className="w-1/2 font-semibold h-[50px] rounded overflow-hidden border border-black bg-white px-3 text-black shadow-2xl transition-all "
                    onClick={() => addToCart(_id)}
                  >
                    <span className="relative z-10 flex items-center gap-2 justify-center">
                      <BsCart className='text-[1.2rem]' />   Add to Cart
                    </span>
                  </button>
                </div>

                <div className='w-full'>
                  <button
                    className="font-semibold  h-[50px] w-1/2 rounded overflow-hidden border border-black bg-black px-3 text-white shadow-2xl transition-all before:w-0 "
                    onClick={() => handelBuyeNow(_id)}
                  >
                    <span className="relative z-10 flex items-center gap-2 justify-center">
                      <BsCart className='text-[1.2rem]' /> Buy
                    </span>
                  </button>
                </div>
              </div>
              <div className='my-4'>
                {
                  coupon && coupon?.map((coupon, index) => {
                    return (
                      <Swiper
                        className="couponSwiper"
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                      >
                        {coupon && coupon?.map((coupon, index) => (
                          <SwiperSlide key={index}>
                            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-center py-6 px-6 rounded-lg shadow-md relative">
                              <h3 className="text-2xl font-semibold mb-4">
                                {coupon.couponText}
                              </h3>
                              <div className="flex items-center justify-center md:flex-row gap-4 flex-col space-x-2 mb-6">
                                <span
                                  id="cpnCode"
                                  className="border-dashed border text-white px-4 py-2 rounded-l"
                                >
                                  {coupon.coupon}
                                </span>
                                <span
                                  id="cpnBtn"
                                  className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer"
                                  onClick={() => handleCopyCoupon(coupon.coupon)}
                                >
                                  {copiedCoupon === coupon.coupon ? 'Copied!' : 'Copy Code'}
                                </span>
                              </div>
                              <p className="text-sm">Valid Till: {coupon.couponPricePercentage}</p>
                              <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6" />
                              <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6" />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )
                  })
                }
                {/* <CopuonSlider /> */}
              </div>
              <hr />
              <h4 className="text-lg mt-5 font-semibold capitalize">Product Description</h4>
              <p className="text-gray-700">
                {description}
              </p>
              <p className='text-lg mt-5 font-semibold capitalize'>Features</p>
              <div className="flex items-center gap-3 mt-2 text-sm">
                <ul className="">
                  {
                    features && features?.map((feature, index) => {
                      return (
                        <li key={index} className='relative after:w-[10px] mt-2 after:rounded-full after:top-0 after:bottom-0 after:my-auto after:h-[10px] after:bg-[#3d3c3c] after:absolute after:left-0 pl-4'>{feature}</li>
                      )
                    })
                  }
                </ul>
              </div>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 my-4">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <hr />
                      <table className="min-w-full text-left text-sm font-light">
                        <tbody>
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              Author :
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {author}
                            </td>
                          </tr>
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              Language :
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {language}
                            </td>
                          </tr>
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              Level :
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {level}
                            </td>
                          </tr>

                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              Cover :
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {cover}
                            </td>
                          </tr>

                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              Category :
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {category}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <hr
          className='my-4 bg-[#000] '
        />
        <div>
          <RecomendationProduct />
        </div>
      </div>
    </RootLayout>
  );
};

export default ProductDetails;