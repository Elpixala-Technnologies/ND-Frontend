"use client";
import React, { useCallback, useEffect } from "react";
import Image from "next/image";

const Carousel = ({
  children: mobileSlideSteps,
  onSlideChange,
  curr,
  setCurr,
}: any) => {
  const prev = () => {
    const newIndex = curr === 0 ? mobileSlideSteps.steps.length - 1 : curr - 1;
    setCurr(newIndex);
    onSlideChange(newIndex);
  };

  const next = useCallback(() => {
    const newIndex = curr === mobileSlideSteps.steps.length - 1 ? 0 : curr + 1;
    setCurr(newIndex);
    onSlideChange(newIndex);
  }, [curr, mobileSlideSteps.steps.length, setCurr, onSlideChange]);

  return (
    <>
      {/* Carousel  */}
      <div className=" relative overflow-hidden">
        <div
          className=" flex transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {mobileSlideSteps.steps.map((slide: any, index: number) => (
            <div key={index} className="slide min-w-full p-5">
              <Image
                src={slide.img}
                alt=""
                width={1200}
                height={1200}
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
     
    </>
  );
};

export default Carousel;
