import React, {
  Fragment,
  useState,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import RootLayout from "@/src/Layouts/RootLayout";
import Image from "next/image";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import useBook from "@/src/Hooks/useBook";
import ProductSlider from "@/src/Components/Home/Products/ProductSlider/ProductSlider";
import { useRouter } from "next/router";
import { AuthContext } from "@/src/Context/UserContext";
import { addToCartUrl } from "@/src/Utils/Urls/BooksUrl";
import Swal from "sweetalert2";
import { ImCross } from "react-icons/im";
import { FaPlus } from "react-icons/fa";

const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductPage = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] =
    useState("Price: Low to High");

  const filters = {
    category: false,
    size: false,
    color: false,
    price: false,
  };
  const [activeFilter, setActiveFilter] = useState("category");

  const router = useRouter();
  const [show, setShow] = useState(false);
  const { bookData, categoryData } = useBook();
  const [currentPage, setCurrentPage] = useState(1);
  const [isCloups, setIsCloups] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // useEffect(() => {
  //     if (router.query.categoryName) {
  //         setSelectedCategory(router.query.categoryName);
  //     }
  // }, [router.query]);


  const handleToggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  useEffect(() => {
    if (router?.query?.categoryName) {
      // @ts-ignore
      setSelectedCategory(router?.query?.categoryName);
    }
  }, [router.query]);

  useEffect(() => {
    if (selectedCategory) {
      setActiveFilter("category");
    }
  }, [selectedCategory]);

  const filteredBooks = useMemo(() => {
    let filtered = bookData;

    if (selectedCategory) {
      filtered = filtered?.filter((book) => book.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered?.filter(
        (book) =>
          book?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book?.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSortOption) {
      // @ts-ignore
      const { sortBy, order } = selectedSortOption;
      filtered = filtered?.sort((a, b) => {
        if (order === "asc") return a[sortBy] - b[sortBy];
        return b[sortBy] - a[sortBy];
      });
    }

    return filtered;
  }, [bookData, selectedCategory, searchQuery, selectedSortOption]);

  const clearFilter = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    setActiveFilter(null);
    setMobileFiltersOpen(false);
    setShow(false);
    setCurrentPage(1);
    setIsCloups(true);
  };
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(filteredBooks?.length / itemsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const { user } = useContext(AuthContext);

  // Add to cart function
  const addToCart = async (id, price) => {
    try {
      if (!user) {
        localStorage.setItem("redirectTo", "/cart");
        localStorage.setItem("itemToAdd", id);
        // Redirect to login page if user is not logged in
        window.location.href = "/auth/login";
        return;
      }

      const response = await fetch(addToCartUrl(id), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book: id,
          quantity: 1,
          totalPrice: price,
          email: user.email,
          status: "unpaid",
        }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Your book has been added to the cart",
          showConfirmButton: false,
          timer: 1500,
        });
        // // Redirect to the cart page after adding the book to the cart
        // window.location.href = '/cart';
      } else {
        // Handle the case where adding to cart is unsuccessful
        Swal.fire({
          icon: "error",
          title: "Failed to add the book to the cart",
          text: data.message || "An error occurred",
        });
      }
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error adding item to cart:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding the book to the cart.",
      });
    }
  };


  const [categories, setCategories] = useState([]);
  const [sortType, setSortType] = useState('alphabetical'); // 'alphabetical' or 'price'

  const [currentBooks, setCurrentBooks] = useState(filteredBooks?.slice(startIndex, endIndex));  // Filtered and paginated books
  const [totalBooks, setTotalBooks] = useState(0); // Total number of books



  useEffect(() => {
    setCategories(categoryData);
  }, [categoryData]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    let filteredBooks = bookData;
  
    if (selectedCategory) {
      filteredBooks = filteredBooks.filter((book) => book.category === selectedCategory);
    }
  
    if (searchQuery) {
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    const sortedBooks = [...filteredBooks];
    if (sortType === 'alphabetical') {
      sortedBooks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'price') {
      sortedBooks.sort((a, b) => {
        const priceA = a.discountPercentage 
          ? a.price - (a.price * a.discountPercentage / 100) 
          : a.price;
        const priceB = b.discountPercentage 
          ? b.price - (b.price * b.discountPercentage / 100) 
          : b.price;
        return priceA - priceB;
      });
    }
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBooks = sortedBooks.slice(startIndex, startIndex + itemsPerPage);
  
    setCurrentBooks(paginatedBooks);
    setTotalBooks(sortedBooks.length);
  }, [sortType, currentPage, itemsPerPage, bookData, selectedCategory, searchQuery]);
  


  return (
    <RootLayout>
      <div>{/* <ProductSlider /> <br /> */}</div>
      <div className="container bg-[#fff]">
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="mt-4 border-t border-gray-200">
                    <Disclosure
                      as="div"
                      className="border-b border-gray-200 py-6 px-4"
                    >
                      {({ open }) => (
                        <>
                          <div className="border-b border-gray-200 py-6">
                            <button
                              onClick={() => handleToggleFilter("category")}
                              className="font-semibold w-full flex gap-4 justify-between items-center"
                            >
                              Category
                              {activeFilter === "category" ? (
                                <MdExpandLess className="text-2xl" />
                              ) : (
                                <MdExpandMore className="text-2xl" />
                              )}
                            </button>
                            {activeFilter === "category" && (
                              <div className="space-y-4">
                                {categoryData && categoryData.length > 0 ? (
                                  categoryData.map((category) => (
                                    <li
                                      key={category._id}
                                      className="cursor-pointer mt-2 flex items-center gap-2"
                                    >
                                      <input
                                        type="checkbox"
                                        id={category?.category}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                        checked={
                                          selectedCategory ===
                                          category?.category
                                        }
                                        onChange={() =>
                                          setSelectedCategory(
                                            category?.category
                                          )
                                        }
                                      />
                                      <label
                                        htmlFor={category?.category}
                                        className="text-gray-700 cursor-pointer"
                                      >
                                        {category?.category}
                                      </label>
                                    </li>
                                  ))
                                ) : (
                                  <div>Loading categories...</div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="border-b border-gray-200 py-6">
                            <button
                              className=" font-semibold w-full flex gap-4 border p-2 rounded justify-between items-center"
                              onClick={() => selectedCategory && clearFilter()}
                            >
                              Reset Filters
                            </button>
                          </div>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between  border-gray-200 pb-6 pt-10">
            <h1 className="md:text-4xl font-bold tracking-tight text-gray-900">
              All Books
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div></div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1"></div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-10">
            <h2 id="products-heading" className="sr-only">
              Books
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <div className="hidden lg:block mt-3">
                {/* <div className="py-6 w-full">
    <button
      className="font-semibold w-full flex gap-4 border p-2 rounded-lg justify-between items-center"
      onClick={() => selectedCategory && clearFilter()}
    >
      Reset Filters
    </button>
  </div> */}
                {selectedCategory && (
                  <div className="p-2 w-full border border-gray-300 rounded-lg shadow-md shadow-gray-500">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{selectedCategory}</span>
                      <button onClick={() => setSelectedCategory(null)}><ImCross /></button>
                    </div>
                  </div>
                )}
                <div className="p-4 px-2 rounded-2xl mt-4">
                  <button
                    onClick={() => handleToggleFilter("category")}
                    className="font-semibold w-full flex gap-4 justify-between items-center  border-2 border-gray-300 rounded-lg p-3"
                  >
                    Category
                    {activeFilter === "category" ? (
                      <MdExpandLess className="text-2xl" />
                    ) : (
                      <MdExpandMore className="text-2xl" />
                    )}
                  </button>
                  {activeFilter === "category" && (
                    <div className="space-y-6 border-gray-400 pt-2 mt-2">
                      {categories && categories.length > 0 ? (
                        categories
                          .filter((category) => category.category !== selectedCategory)
                          .map((category) => (
                            <li
                              key={category._id}
                              className="cursor-pointer mt-2 flex items-center gap-2"
                              onClick={() => handleSelectCategory(category.category)}
                            >
                              <label
                                className={`text-gray-700 cursor-pointer pl-2 flex items-center justify-between w-full ${selectedCategory === category.category ? 'font-semibold' : ''}`}
                              >
                                {category.category}
                                <span><FaPlus className="text-sm" /></span>
                              </label>
                            </li>
                          ))
                      ) : (
                        <div>Loading categories...</div>
                      )}
                    </div>
                  )}
                </div>
              </div>


              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="flex flex-wrap gap-2 mb-4">
                  {/* Alphabetical Sort Button */}
                  <button
                    onClick={() => setSortType('alphabetical')}
                    className={`px-4 py-2 rounded-full ${sortType === 'alphabetical' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                  >
                    Alphabetical
                  </button>
                  {/* Price Sort Button */}
                  <button
                    onClick={() => setSortType('price')}
                    className={`px-4 py-2 rounded-full ${sortType === 'price' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                  >
                    Price
                  </button>
                  {/* Items Per Page Dropdown */}
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800"
                  >
                    {[10, 20, 30, 50].map((num) => (
                      <option key={num} value={num}>
                        {num} items per page
                      </option>
                    ))}
                  </select>
                  {/* Showing Books Out of Total */}
                  <div className="px-4 py-2 text-gray-800">
                    Showing {currentBooks.length} out of {totalBooks} books
                  </div>
                </div>
                <li className="flex items-center my-4 rounded-xl border border-[#999] relative gap-2 w-full">
                  <AiOutlineSearch className="text-black text-2xl mx-6" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full py-4 no-outline focus:outline-none bg-transparent rounded-xl text-black border border-[#999]"
                    placeholder="Search ..."
                  />
                </li>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  <div className="lg:col-span-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                      {currentBooks.map((book) => (
                        <div key={book.id} className=" w-full transform hover:-translate-y-1 hover:scale-100 rounded-3xl flex flex-col justify-between ">
                          <div className="bg-white shadow-xl shadow-gray-300 p-5 rounded-md">
                            <Image
                              src={book.image[0]}
                              width={400}
                              height={500}
                              alt={book.name}
                              className="rounded-md fit h-64"
                            />
                          </div>
                          <div className="pb-4 flex flex-col items-center rounded-3xl">
                            <Link href={`/product/${book.id}`} className="flex flex-col items-center justify-center">
                              <h4 className="text-lg line-clamp-1 font-bold ">{book.name.slice(0, 28) + ".."}</h4>
                              <h4 className="">{book.category.slice(0, 28) + ".."}</h4>

                            </Link>
                            <div className="flex items-center md:flex-row gap-2 md:gap-4">
                              <h1 className="text-lg md:text-xl font-bold text-slate-900">
                                {book.discountPercentage ? `₹ ${book.price - (book.price * book.discountPercentage) / 100}` : `₹ ${book.price}`}
                              </h1>
                              {book.discountPercentage !== "0" && (
                                <>
                                  <span className="text-sm md:text-base text-slate-900 line-through mt-1">₹ {book.price}</span>
                                  <span className="text-red-500 text-sm md:text-base">{book.discountPercentage} % off</span>
                                </>
                              )}
                            </div>
                            <div className="w-fit  flex items-center justify-center mt-2 bg-[#1e89d1] p-2 rounded-full ">
                              <button onClick={() => addToCart(book._id, book.price)}>
                                <span className="shadow"></span>
                                <span className="edge"></span>
                                <span className="front text-white"> Buy Now</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  {/* Pagination controls */}
                  <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`mx-2 px-4 py-2 rounded-full ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </section>
        </main>
      </div>
    </RootLayout>
  );
};

export default ProductPage;
