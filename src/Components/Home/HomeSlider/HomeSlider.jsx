import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";
 
const HomeSliderData = [
  {
    id: 1,
    desktopImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813670/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/4_uspbkf.png",
    mobileImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813672/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/4_fc2wt5.png", // Add mobile image for slide 1
  },
  {
    id: 2,
    desktopImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813669/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/2_ulnaap.png",
    mobileImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813671/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/3_obdw6l.png", // Add mobile image for slide 2
  },
  {
    id: 3,
    desktopImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813668/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/5_bss1sp.png",
    mobileImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813671/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/5_r2mxgl.png", // Add mobile image for slide 3
  },
  {
    id: 4,
    desktopImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813668/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/5_bss1sp.png",
    mobileImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813671/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/2_tngnvp.png", // Add mobile image for slide 4
  },
  {
    id: 5,
    desktopImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813660/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/4_y7a8ie.png",
    mobileImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813660/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/3_jnsdog.png", // Add mobile image for slide 5
  },
  {
    id: 6,
    desktopImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813668/ND%20Banners/ND%20Books%20PC%20%281903%20x%20755%20px%29/1_ftvmfq.png",
    mobileImage: "https://res.cloudinary.com/ndclouds/image/upload/v1704813660/ND%20Banners/ND%20Books%20Mobile%20%28414%20x%20477%20px%29/5_idlf1l.png", // Add mobile image for slide 6
  },
];

const HeroSlider = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Define your mobile breakpoint
    };

    handleResize(); // Check the initial screen width
    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Remove the event listener when the component unmounts
    };
  }, []);

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper heroSlider"
      >
        {HomeSliderData &&
          HomeSliderData?.map((slide) => {
            return (
              <SwiperSlide key={slide?.id}>
                <div className="slider-images">
                  <Image
                    src={isMobile ? slide?.mobileImage : slide?.desktopImage}
                    alt="Banner Image"
                    className="w-full h-full homeSliderImage"
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

export default HeroSlider;
