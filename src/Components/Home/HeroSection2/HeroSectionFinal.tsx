"use client"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { One } from "@/src/Assets";
import { useEffect, useState } from "react";
import Carousel from "./Crousel";

export default function HeroSectionFinal() {
    const [step, setStep] = useState(1);
    const [curr, setCurr] = useState(0);

    const handleSlideChange = (index) => {
        setStep(index);
    };

    const prev = () => {
        const newIndex = curr === 0 ? mobileSlideSteps.steps.length - 1 : curr - 1;
        setCurr(newIndex);
        handleSlideChange(newIndex);
    };

    const next = () => {
        const newIndex = curr === mobileSlideSteps.steps.length - 1 ? 0 : curr + 1;
        setCurr(newIndex);
        handleSlideChange(newIndex);
    };

    useEffect(() => {
        const autoSlideInterval = 9000;
        const autoSlideTimeout = setTimeout(next, autoSlideInterval);
        return () => clearTimeout(autoSlideTimeout);
    }, [curr]);

    return (
        <div className="my-10 flex items-center justify-center " style={{ backgroundImage: 'linear-gradient(to right, #D1D5DB, #D1D5DB 33%, #fff 66%, #fff)' }}>
            <div className="">
                <div className="flex min-h-[70vh] flex-col items-center overflow-hidden rounded-lg bg-white md:flex-row max-w-[1200px] mx-auto">
                    <div className="flex min-h-[70vh] flex-col items-start justify-center bg-gradient-to-r from-gray-300 to-white p-8 md:w-1/2">
                        <h2 className="mb-10 text-5xl font-bold">Ipsum Dolor Si</h2>
                        <p className="mb-4 font-serif leading-10 tracking-wide text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
                            feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus
                            ut magna velit eleifend. Amet, quis urna, a eu.
                        </p>
                        <div className="flex flex-col items-start">
                            <button className="mb-4 rounded-lg bg-blue-500 px-4 py-2 text-white">
                                READ MORE
                            </button>
                            <ul className="flex gap-5">
                                {mobileSlideSteps.steps.map((stepItem, index) => (
                                    <li
                                        onClick={() => {
                                            setCurr(index);
                                            setStep(index);
                                        }}
                                        key={stepItem.id}
                                        className={`relative flex items-center justify-center ${
                                            index === step ? 'p-2 border-2 border-orange-500 rounded-full' : 'p-2'
                                        }`}
                                    >
                                        <div
                                            className={`${
                                                index === step
                                                    ? 'bg-orange-500'
                                                    : 'bg-gray-500'
                                            } rounded-full w-4 h-4 flex items-center justify-center`}
                                        >
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="customStyle relative md:w-1/2">
                        <Carousel
                            autoSlide={true}
                            onSlideChange={handleSlideChange}
                            curr={curr}
                            setCurr={setCurr}
                        >
                            {mobileSlideSteps}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
}



const mobileSlideSteps = {

    steps: [
        {
            id: 1,
            title: "Choose Your Desired Course",
            content: "Take a step closer to your dream career by selecting the right course.",
            img: One,
        },
        {
            id: 2,
            title: "Provide Basic Details",
            content: "Help us understand you better by sharing basic information and answering a few questions.",
            img: One,
        },
        {
            id: 3,
            title: "Explore Your Opportunities",
            content:
                "Broaden your horizons and discover top universities with our curated list.",
            img: One,
        },
        {
            id: 4,
            title: "Compare & Find the Best",
            content:
                "Compare top universities based on various factors like student ratings, government approvals, CV score, placement assistance, and more.",
            img: One,
        },
        {
            id: 5,
            title: "Support Every Step of the Way",
            content: "Reach out to our team of experts for any queries or assistance.",
            img: One,
        },
    ],
};
