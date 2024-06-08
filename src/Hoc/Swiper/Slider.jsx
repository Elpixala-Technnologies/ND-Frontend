import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
// import "./style.module.css";
import PropTypes from "prop-types";

import { Navigation, FreeMode, Scrollbar } from "swiper";

const Slider = ({ children, options }) => {
  const swiperOptions = {
    spaceBetween: 20,
    centeredSlides: false,
    modules: [FreeMode, Navigation, Scrollbar],
    freeMode: true,
    cssMode: true,
    slidesPerView: "3", //auto
    navigation: {
      nextEl: "#custom-next",
      prevEl: "#custom-prev",
    },
    scrollbar: {
      hide: true,
      draggable: true,
    },
    ...options,
  };

  return (
    <Swiper {...swiperOptions} className="">
      {children}
    </Swiper>
  );
};

Slider.propTypes = {
  children: PropTypes.any.isRequired,
  options: PropTypes.object,
};

Slider.defaultProps = {
  options: {},
};

export default Slider;
