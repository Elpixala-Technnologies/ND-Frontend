import useBook from '@/src/Hooks/useBook';
import DashboardLayout from '@/src/Layouts/DashboardLayout';
import UpdateInventoryModal from '@/src/Shared/Modal/UpdateInventoryModal/UpdateInventoryModal';
import { Button } from 'antd';
import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const DashboardPage = () => {
    const { bookData,  handelBookDelete } = useBook();
    const itemsPerPage = 10; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the productData array to display only the current page's items
    const displayedProducts = bookData?.slice(startIndex, endIndex);

    // Function to handle page change
    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    // Function to handle previous page
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Calculate total pages
    const totalPages = Math?.ceil(bookData?.length / itemsPerPage);

    const [isUpdateInventoryModalOpen, setIsUpdateInventoryModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // Store the selected Product data

    const showUpdateInventoryModal = (UpdateInventory) => {
        setSelectedProduct(UpdateInventory);
        setIsUpdateInventoryModalOpen(true);

    }

    return (
        <DashboardLayout>
              <section>
                <h3 className="text-2xl my-2">Manage Inventory</h3>
            </section>

            <div>
                <div className="flex flex-col w-full">
                    <div className="overflow-x-auto sm:-mx-6 w-full">
                        <div className="inline-block w-full py-2 align-middle md:px-6 lg:px-8 ">
                            <div className=" border border-gray-200 dark:border-gray-700 md:rounded-lg ">
                                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                S No.
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Image
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                               Book
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Discount
                                            </th>


                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Quantity
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Status
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {displayedProducts &&
                                            displayedProducts?.map((product, Index) => {
                                                return (
                                                    <tr key={Index}>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                            <div className="inline-flex items-center gap-x-3">
                                                                <span>{Index + 1}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                            {product?.image && <img src={product?.image[0]} alt="product" className="w-10 h-10" />}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                            {product?.name}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                            {product?.price}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                            {product?.discountPercentage}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                            {product?.quantity}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                            {
                                                                product?.quantity > 0 ? <span className="text-green-500">In Stock</span> : <span className="text-red-500">Out of Stock</span>
                                                            }
                                                        </td>

                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div className="flex items-center gap-x-6">
                                                                <button
                                                                    className="text-red-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                                                                    onClick={() =>
                                                                        handelBookDelete(product?._id)
                                                                    }
                                                                >
                                                                    Delete
                                                                </button>

                                                                <Button type="default"
                                                                    onClick={() => showUpdateInventoryModal(product)}
                                                                >
                                                                    {
                                                                        product?.quantity > 0 ? "Update Inventory" : "Add Inventory"
                                                                    }
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pagination */}
            <div className={`items-center justify-center gap-4 mt-11 mb-16`} data-aos="fade-up" data-aos-delay="200">
                <div className="flex items-center justify-center text-gray-400">
                    <button
                        title="Previous"
                        className={`h-14 w-14 text-center ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "hover:bg-red-10"
                            } text-white bg-black-10 rounded-l-md border ${currentPage === 1 ? "bg-gray-400" : "bg-red-500"
                            } flex items-center justify-center`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <FaArrowLeft className="text-white" />
                    </button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            className={`h-14 w-14 hover:text-white bg-red-500 ${currentPage === index + 1 ? "text-white bg-red-600" : "bg-black-10"
                                } text-center hover:bg-red-10 text-white border`}
                            onClick={() => handlePageChange(index + 1)}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                    {/* Next button */}
                    <button
                        title="Next"
                        className={`h-14 w-14 text-center ${currentPage === totalPages
                            ? "bg-gray-400 cursor-not-allowed"
                            : "hover:bg-red-10"
                            } text-white bg-black-10 rounded-r-md border ${currentPage === totalPages ? "bg-gray-400" : "bg-red-500"
                            } flex items-center justify-center`}
                        onClick={() => {
                            if (currentPage < totalPages) {
                                handlePageChange(currentPage + 1);
                            }
                        }}
                        disabled={currentPage === totalPages}
                    >
                        <FaArrowRight className="text-white" />
                    </button>
                </div>
            </div>

            {selectedProduct && (
                <UpdateInventoryModal
                    isUpdateInventoryModalOpen={isUpdateInventoryModalOpen}
                    setIsUpdateInventoryModalOpen={setIsUpdateInventoryModalOpen}
                    selectedProduct={selectedProduct}
                />
            )}
        </DashboardLayout>
    );
};

export default DashboardPage;