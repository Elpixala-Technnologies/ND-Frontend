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
      desktopImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813668/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/5_bss1sp.png",
      mobileImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813671/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/5_r2mxgl.png", // Add mobile image for slide 3
    },
    {
      id: 2,
      desktopImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813668/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/5_bss1sp.png",
      mobileImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813671/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/2_tngnvp.png", // Add mobile image for slide 4
    },
    {
      id: 3,
      desktopImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813660/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/4_y7a8ie.png",
      mobileImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813660/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/3_jnsdog.png", // Add mobile image for slide 5
    },
    {
      id: 4,
      desktopImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813668/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/1_ftvmfq.png",
      mobileImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813660/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/5_idlf1l.png", // Add mobile image for slide 6
    }
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
