// import React from 'react';
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Autoplay, Pagination, Navigation } from "swiper";
// import Image from 'next/image';
// import {
//   BannerSevenImage, BannerFiveImage, BannerThreeImage, BannerOneImage,
//   MobileBannerEightImage, MobileBannerElevenImage, MobileBannerFiveImage, 
//   MobileBannerFourImage, MobileBannerFourteenImage, MobileBannerNineImage, 
//   MobileBannerOneImage, MobileBannerSevenImage, MobileBannerSixImage
// } from '@/src/Assets';


// const HomeBestSealSlider = () => {
//   const HomeSliderData = [
//     {
//       id: 1,
//       image: BannerSevenImage,
//     },
//     {
//       id: 2,
//       image: BannerFiveImage,
//     },
//     {
//       id: 3,
//       image: BannerThreeImage,
//     },
//     {
//       id: 4,
//       image: BannerOneImage,
//     },
//   ];
//   return (
//     <div>
//       <Swiper
//         spaceBetween={30}
//         centeredSlides={true}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//         loop={true}
//         modules={[Autoplay, Pagination, Navigation]}
//         className="best-product-swiper">
//         {HomeSliderData &&
//           HomeSliderData.map((slide) => {
//             return (
//               <SwiperSlide key={slide.id}>
//                 <Image
//                   src={slide.image}
//                   alt="slider image"
//                   layout="responsive"
//                   width={750}
//                   height={300}
//                   className="w-[100%] h-[100%]"
//                 />
//               </SwiperSlide>
//             );
//           })}
//       </Swiper>
//     </div>
//   );
// };

// export default HomeBestSealSlider;

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";
import {
  BannerOneImage,
  BannerTowImage,
  BannerThreeImage,
  BannerFourImage,
  BannerFiveImage,
  BannerSixImage,
  BannerSevenImage,
  MobileBannerOneImage,
  MobileBannerTowImage,
  MobileBannerThreeImage,
  MobileBannerFourImage,
  MobileBannerFiveImage,
  MobileBannerSixImage,
  MobileBannerSevenImage,
} from "@/src/Assets";

const HomeBestSealSlider = () => {
  const HomeSliderData = [
    {
      id: 1,
      desktopImage: "https://res.cloudinary.com/dqbwjnwur/image/upload/v1704813670/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/4_uspbkf.png",
      mobileImage: "https://res.cloudinary.com/dqbwjnwur/image/upload/v1704813672/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/4_fc2wt5.png", // Add mobile image for slide 1
    },
    {
      id: 2,
      desktopImage: "https://res.cloudinary.com/dqbwjnwur/image/upload/v1704813669/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/2_ulnaap.png",
      mobileImage: "https://res.cloudinary.com/dqbwjnwur/image/upload/v1704813671/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/3_obdw6l.png", // Add mobile image for slide 2
    },
    {
      id: 3,
      desktopImage: "https://res.cloudinary.com/dqbwjnwur/image/upload/v1704813668/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/5_bss1sp.png",
      mobileImage: "https://res.cloudinary.com/dqbwjnwur/image/upload/v1704813671/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/5_r2mxgl.png", // Add mobile image for slide 3
    },
    {
      id: 4,
      desktopImage: "https://res.cloudinary.com/dqbwjnwur/image/upload/v1704813668/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/5_bss1sp.png",
      mobileImage: "https://res.cloudinary.com/dqbwjnwur/image/upload/v1704813671/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/2_tngnvp.png", // Add mobile image for slide 4
    },
    {
      id: 5,
      desktopImage: "https://res.cloudinary.com/dqbwjnwur/image/upload/v1704813660/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/4_y7a8ie.png",
      mobileImage: "https://res.cloudinary.com/dqbwjnwur/image/upload/v1704813660/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/3_jnsdog.png", // Add mobile image for slide 5
    },
    {
      id: 6,
      desktopImage: "https://res.cloudinary.com/dqbwjnwur/image/upload/v1704813668/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/1_ftvmfq.png",
      mobileImage: "https://res.cloudinary.com/dqbwjnwur/image/upload/v1704813660/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/5_idlf1l.png", // Add mobile image for slide 6
    }
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="best-product-swiper"
      >
        {HomeSliderData &&
          HomeSliderData?.map((slide) => {
            return (
              <SwiperSlide key={slide.id}>
                <div className="slider-images">
                  <Image
                    src={isMobile ? slide.mobileImage : slide.desktopImage}
                    alt="Banner Image"
                    className="w-full h-full homeSliderImage"
                    width={isMobile ? 768 : 1920}
                    height={isMobile ? 768 : 500}
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default HomeBestSealSlider;
