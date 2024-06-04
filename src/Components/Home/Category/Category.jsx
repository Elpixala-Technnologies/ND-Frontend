import Image from "next/image";
import usePopularCategory from "@/src/Hooks/usePopularCategory";
import Skeleton from "react-loading-skeleton";
import { Rating } from "@mui/material";

const Category = () => {
    const { popularCategoryData, isLoading } = usePopularCategory();
    return (
        <div className='grid grid-cols-3 md:gap-12 gap-2 mt-6 w-full h-full max-w-[1440px]'>
  {isLoading ? (
    <>
      <div className='flex items-center justify-center'>
        <Skeleton width={400} height={500} />
      </div>
      <div className='flex items-center justify-center'>
        <Skeleton width={400} height={500} />
      </div>
      <div className='flex items-center justify-center'>
        <Skeleton width={400} height={500} />
      </div>
    </>
  ) : (
    popularCategoryData?.slice(0, 8)?.map((itm) => (
      <div className='w-full h-full flex items-center justify-center' key={itm?._id}>
        <div className='card w-fit'>
          <div className='book'>
            <div className='text-center pl-10 flex flex-col items-center justify-center gap-8 w-full'>
              <span className='sp-1 md:block hidden text-gray-500 md:text-md font-semibold'>
                {itm?.popularCategoryDetail}
              </span>
              <button
                className='cta'
                onClick={() =>
                  window.location.href = `/product?categoryName=${encodeURIComponent(itm?.popularCategory)}`
                }
              >
                <span>Read More</span>
              </button>
            </div>
            <div className='cover flex flex-col overflow-hidden items-start justify-start'>
              <Image
                src={itm?.popularCategoryImage}
                className='object-fill h-[80%] rounded-lg w-full'
                width={500}
                height={500}
              />
              <div className='md:px-3 px-2 pt-1 w-full'>
                <h3 className='font-[600] lg:text-lg text-sm line-clamp-2 w-full leading-none'>
                  {itm?.popularCategory?.slice(0, 50)}
                </h3>
                <div className='flex items-center justify-between'>
                  <Rating name='half-rating' defaultValue={2.5} precision={0.5} readOnly />
                  <span className='flex gap-2 items-center'>({"300 "} Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  )}
</div>

    );
};

export default Category;
