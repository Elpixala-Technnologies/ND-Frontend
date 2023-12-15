import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { FunnelIcon, } from '@heroicons/react/20/solid'
import { AiOutlineSearch } from 'react-icons/ai';
import Link from 'next/link';
import RootLayout from '@/src/Layouts/RootLayout';
import Image from 'next/image';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import useBook from '@/src/Hooks/useBook';
import ProductSlider from '@/src/Components/Home/Products/ProductSlider/ProductSlider';
import { useRouter } from 'next/router';

const sortOptions = [
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}




const ProductPage = () => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState('Price: Low to High');

    const filters = {
        category: false,
        size: false,
        color: false,
        price: false,
    };
    const [activeFilter, setActiveFilter] = useState(null);
    // const handleToggleFilter = (filter) => {
    //     if (activeFilter === filter) {
    //         setActiveFilter(null);
    //     } else {
    //         setActiveFilter(filter);
    //     }
    // };


    const router = useRouter();
    const [show, setShow] = useState(false);
    const { bookData, categoryData } = useBook();
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [isCloups, setIsCloups] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("")

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // useEffect(() => {
    //     if (router.query.categoryName) {
    //         setSelectedCategory(router.query.categoryName);
    //     }
    // }, [router.query]);

    const handleToggleFilter = (filter) => {
        if (activeFilter === filter || (filter === 'category' && selectedCategory)) {
            setActiveFilter(null);
        } else {
            setActiveFilter(filter);
        }
    };

    useEffect(() => {
        if (router.query.categoryName) {
            setSelectedCategory(router.query.categoryName);
        }
    }, [router.query]);

    useEffect(() => {
        if (selectedCategory) {
            setActiveFilter('category');
        }
    }, [selectedCategory]);

    const filteredBooks = useMemo(() => {
        let filtered = bookData;

        if (selectedCategory) {
            filtered = filtered?.filter(book => book.category === selectedCategory);
        }

        if (searchQuery) {
            filtered = filtered?.filter(book =>
                book?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book?.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedSortOption) {
            const { sortBy, order } = selectedSortOption;
            filtered = filtered?.sort((a, b) => {
                if (order === 'asc') return a[sortBy] - b[sortBy];
                return b[sortBy] - a[sortBy];
            });
        }

        return filtered;
    }, [bookData, selectedCategory, searchQuery, selectedSortOption]);


    const clearFilter = () => {
        setSelectedCategory(null);
        setSearchQuery('');
        setActiveFilter(null);
        setMobileFiltersOpen(false);
        setShow(false);
        setCurrentPage(1);
        setIsCloups(true);

    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentBooks = filteredBooks?.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredBooks?.length / itemsPerPage);

    const changePage = (page) => {
        setCurrentPage(page);
    };


    console.log(bookData, "bookData+++")

    return (
        <RootLayout>
            <div>
                <ProductSlider /> <br />
            </div>
            <div className="container bg-[#fff]">
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
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
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
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
                                        <Disclosure as="div" className="border-b border-gray-200 py-6 px-4">
                                            {({ open }) => (
                                                <>

                                                    <div className="border-b border-gray-200 py-6">
                                                        <button onClick={() => handleToggleFilter('category')} className="font-semibold w-full flex gap-4 justify-between items-center">
                                                            Category
                                                            {activeFilter === 'category' ? <MdExpandLess className='text-2xl' /> : <MdExpandMore className='text-2xl' />}
                                                        </button>
                                                        {activeFilter === 'category' && (
                                                            <div className="space-y-4">
                                                                {categoryData && categoryData.length > 0 ? (
                                                                    categoryData.map((category) => (
                                                                        <li key={category._id} className="cursor-pointer mt-2 flex items-center gap-2">
                                                                            <input
                                                                                type="checkbox"
                                                                                id={category?.category}
                                                                                className="form-checkbox h-5 w-5 text-blue-600"
                                                                                checked={selectedCategory === category?.category}
                                                                                onChange={() => setSelectedCategory(category?.category)}
                                                                            />
                                                                            <label htmlFor={category?.category} className="text-gray-700 cursor-pointer">
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
                        <h1 className="md:text-4xl font-bold tracking-tight text-gray-900">All Books</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                </div>

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
                                        <div className="py-1">

                                        </div>
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
                            <div className="hidden lg:block">

                                <div className="border-b border-gray-200 py-6">
                                    <button onClick={() => handleToggleFilter('category')} className="font-semibold w-full flex gap-4 justify-between items-center">
                                        Category
                                        {activeFilter === 'category' ? <MdExpandLess className='text-2xl' /> : <MdExpandMore className='text-2xl' />}
                                    </button>
                                    {activeFilter === 'category' && (
                                        <div className="space-y-4">
                                            {categoryData && categoryData.length > 0 ? (
                                                categoryData.map((category) => (
                                                    <li key={category._id} className="cursor-pointer mt-2 flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            id={category?.category}
                                                            className="form-checkbox h-5 w-5 text-blue-600"
                                                            checked={selectedCategory === category?.category}
                                                            onChange={() => setSelectedCategory(category?.category)}
                                                        />
                                                        <label htmlFor={category?.category} className="text-gray-700 cursor-pointer">
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

                            </div>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <li className="flex items-center my-4 rounded-xl border border-[#999] relative  gap-2 w-full">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        className="w-full px-6 p-2 no-outline focus:outline-none rounded-xl text-black border border-[#999]"
                                        placeholder='Search ...'
                                    />
                                    <AiOutlineSearch className='text-black text-[1.5rem] mx-6' />
                                </li>
                                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                    <div className="lg:col-span-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                                            {currentBooks && currentBooks.map((book) => {
                                                return (
                                                    <Link key={book?.id} href={`/product/${book?.id}`}>
                                                        <div className="card w-full bg-white px-3 pt-2 shadow-lg cursor-pointer hover:animate-pulse transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 rounded">
                                                            <div className="bg-[#ebeef0]">
                                                                <Image
                                                                    src={book?.image[0]}
                                                                    width={400}
                                                                    height={500}
                                                                    alt={book?.name}
                                                                    className=" rounded w-full h-full"
                                                                />
                                                            </div>

                                                            <div className="pb-4">
                                                                <h4 className='font-bold my-2'>
                                                                    {book.category}
                                                                </h4>
                                                                <h4 className="text-lg">{book?.name?.slice(0, 28) + ".."}</h4>
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
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {/* Pagination controls */}
                                    <div className="flex justify-center mt-4">
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => changePage(i + 1)}
                                                className={`mx-2 px-4 py-2 rounded-md ${currentPage === i + 1
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                                    }`}
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
    )
}

export default ProductPage;
