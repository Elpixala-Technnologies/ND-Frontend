import Image from "next/image";
import usePopularCategory from "@/src/Hooks/usePopularCategory";
import Skeleton from "react-loading-skeleton";
import { SwiperSlide } from "swiper/react";
import Slider from "@/src/Hoc/Swiper/Slider";
import { Childern, RightArrow } from "@/src/Assets";

const Category = () => {
  const { popularCategoryData, isLoading } = usePopularCategory();
  return (
    <div className="pt-20 pb-10 w-full h-full max-w-[1440px]">
      {isLoading ? (
        <>
          <div className="flex items-center justify-center">
            <Skeleton width={400} height={500} />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton width={400} height={500} />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton width={400} height={500} />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-y-9">
          <div className="flex items-center gap-4 ">
            <div className="flex flex-col gap-2 basis-1/2">
              <div className="flex items-center gap-1">
              <div className="w-5 h-0.5 bg-primary"></div>
              <h2 className="text-primary text-lg "> Categories</h2>
              </div>
              <h4 className="text-3xl tracking-wider text-secondary">
                Explore our Top categories
              </h4>
              <div className="relative w-40 flex items-center gap-4 mt-2">
                <div
                  className="custom-prev  bg-primary w-8 h-8 flex items-center justify-center rounded-full"
                  id="custom-prev"
                >
                  <Image
                    src={RightArrow}
                    alt=""
                    className="w-6 h-6 rotate-180 cursor-pointer"
                    width={100}
                    height={100}
                  />
                </div>
                <div
                  className=" custom-next  bg-primary w-8 h-8 flex items-center justify-center rounded-full cursor-pointer "
                  id="custom-next"
                >
                  <Image
                    src={RightArrow}
                    alt=""
                    className="w-6 h-6"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
            <div className="text-sm basis-1/2 text-black ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi modi nobis nesciunt recusandae labore ipsum, asperiores minus eos culpa necessitatibus officia? Repellat aspernatur minima dicta? Minima laborum quos, iure ipsam beatae velit placeat ipsa!
            </div>
          </div>

          <Slider>
            {popularCategoryData?.map((itm, index) => (
              <SwiperSlide
                key={index}
                className="max-w-full max-h-auto cursor-pointer"
              >
                <div className="flex flex-col gap-3">
                  <Image
                    src={itm?.popularCategoryImage}
                    className="!object-fill !object-center rounded-xl !w-[360px] !h-[260px]"
                    width={1000}
                    height={1000}
                    alt="name"
                  />
                  <p>
                    <h3 className="font-inter font-medium text-lg text-center line-clamp-1 text-secondary">
                      {itm?.popularCategory?.slice(0, 50)}
                    </h3>
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Slider>
        </div>
        // popularCategoryData?.slice(0, 8)?.map((itm) => (
        //   <div
        //     className="w-full h-full flex items-center justify-center"
        //     key={itm?._id}
        //   >
        //     <div className="card w-fit">
        //       <div className="book">
        //         <div className="text-center pl-10 flex flex-col items-center justify-center gap-8 w-full">
        //           <span className="sp-1 md:block hidden text-gray-500 md:text-md font-semibold">
        //             {itm?.popularCategoryDetail}
        //           </span>
        //           <button
        //             className="cta"
        //             onClick={() =>
        //               (window.location.href = `/product?categoryName=${encodeURIComponent(
        //                 itm?.popularCategory
        //               )}`)
        //             }
        //           >
        //             <span>Read More</span>
        //           </button>
        //         </div>
        //         <div className="cover flex flex-col overflow-hidden items-start justify-start">
        //           <Image
        //             src={itm?.popularCategoryImage}
        //             className="object-fill h-[80%] rounded-lg w-full"
        //             width={500}
        //             height={500}
        //             alt="name"
        //           />
        //           <div className="md:px-3 px-2 pt-1 w-full">
        //             <h3 className="font-[600] lg:text-lg text-sm line-clamp-2 w-full leading-none">
        //               {itm?.popularCategory?.slice(0, 50)}
        //             </h3>
        //             <div className="flex items-center justify-between">
        //               <Rating
        //                 name="half-rating"
        //                 defaultValue={2.5}
        //                 precision={0.5}
        //                 readOnly
        //               />
        //               <span className="flex gap-2 items-center">
        //                 ({"300 "} Reviews)
        //               </span>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // ))
      )}
    </div>
  );
};

export default Category;
