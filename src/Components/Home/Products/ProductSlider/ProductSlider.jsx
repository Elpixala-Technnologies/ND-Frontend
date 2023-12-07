import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper';
import Image from 'next/image';
import {
  BannerFiveImage,
  BannerThreeImage,
  BannerFourImage,
  MobileBannerFiveImage,
  MobileBannerThreeImage,
  MobileBannerFourImage,
} from '@/src/Assets';

const ProductSlider = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);  
    };

    handleResize();  
    window.addEventListener('resize', handleResize);  

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  const slidesData = [
    {
      id: 1,
      desktopImage: BannerFiveImage,
      mobileImage: MobileBannerFiveImage, // Add mobile image for slide 1
    },
    {
      id: 2,
      desktopImage: BannerThreeImage,
      mobileImage: MobileBannerThreeImage, // Add mobile image for slide 2
    },
    {
      id: 3,
      desktopImage: BannerFourImage,
      mobileImage: MobileBannerFourImage, // Add mobile image for slide 3
    },
  ];

  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="product-swiper"
      >
        {slidesData &&
          slidesData.map((slide) => {
            return (
              <SwiperSlide key={slide.id}>
                <div className="slider-images">
                  <Image
                    src={isMobile ? slide.mobileImage : slide.desktopImage}
                    alt="Banner Image "
                    className="w-full h-auto homeSliderImage"
                    width={1920}
                    height={500}
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
