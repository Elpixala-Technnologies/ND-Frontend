import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const REVIEWS = [
    {
        id: 6,
        name: 'Alice',
        role: 'Data Scientist',
        avatar: 'https://i.pravatar.cc/150?img=23',
        review: `Absolutely mind-blowing! From graphics to gameplay, it's a virtual masterpiece. I lost track of time in the immersive experience.`,
    },
    {
        id: 0,
        name: 'Bob',
        role: 'Architect',
        avatar: 'https://i.pravatar.cc/150?img=13',
        review: `A hidden gem for tech enthusiasts. The selection is vast, and the ease of discovering new tech is addictively delightful!`,
    },
    {
        id: 2,
        name: 'Charlie',
        role: 'DevOps Engineer',
        avatar: 'https://i.pravatar.cc/150?img=8',
        review: `Results speak louder than words. I've never seen progress like this. The workflows are challenging but oh-so-rewarding. Kudos!`,
    },
    {
        id: 3,
        name: 'Diana',
        role: 'Product Manager',
        avatar: 'https://i.pravatar.cc/150?img=41',
        review: `It's very easy to customize and categorize lists for new projects/task categories.`,
    },
    {
        id: 13,
        name: 'Ethan',
        role: 'Software Engineer',
        avatar: 'https://i.pravatar.cc/150?img=57',
        review: `An adventure for the curious mind. Every click led to a new discovery. It's like a digital journey through the wonders of the internet.`,
    },
    {
        id: 4,
        name: 'Fiona',
        role: 'Marketing Specialist',
        avatar: 'https://i.pravatar.cc/150?img=42',
        review: `Plan, create, and explore seamlessly. This service made my creative dreams a reality. Smooth navigation, and the recommendations were spot on.`,
    },
    {
        id: 10,
        name: 'George',
        role: 'Software Developer',
        avatar: 'https://i.pravatar.cc/150?img=21',
        review: `A game-changer for organization. Tasks, calendars, notes – everything neatly synced. My life has never been this streamlined. Pure genius!`,
    },
    {
        id: 11,
        name: 'Hannah',
        role: 'Graphic Designer',
        avatar: 'https://i.pravatar.cc/150?img=18',
        review: `Drowning in a sea of creativity. The content here is a visual feast. An endless source of inspiration for my artistic endeavors.`,
    },
    {
        id: 5,
        name: 'Ian',
        role: 'CTO',
        avatar: 'https://i.pravatar.cc/150?img=33',
        review: `Discovering new beats is addictive with this service. The curated playlists are spot-on, and the personalized recommendations are eerily accurate. A music lover's paradise!`,
    },
];

const TestimonialSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + REVIEWS.length) % REVIEWS.length);
    };

    useEffect(() => {
        const slides = sliderRef.current.querySelectorAll('.card');
        slides.forEach((slide, index) => {
            slide.classList.add('opacity-0');
            slide.querySelector('blockquote').classList.add('scale-0', 'before:-translate-y-full');
            slide.querySelector('.details').classList.add('scale-0', 'translate-y-[150px]');
        });

        const currentSlide = slides[currentIndex];
        currentSlide.classList.remove('opacity-0');
        currentSlide.querySelector('blockquote').classList.remove('scale-0', 'before:-translate-y-full');
        currentSlide.querySelector('.details').classList.remove('scale-0', 'translate-y-[150px]');
    }, [currentIndex]);

    return (
        <div className="bg-gradient-to-tr from-slate-200 to-slate-50 text-slate-800 flex flex-col justify-center items-center relative px-4 rounded-md">
            <main className="bg-white my-16 w-full max-w-2xl rounded-3xl text-center p-8 sm:p-16 [&_*]:ease-in-out">
                <h1 className="text-2xl font-bold">A word from our customers</h1>
                <p className="text-xl">We've been helping businesses do their best since 2018</p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-[60px_auto_60px] [grid-template-areas:'slider_slider'_'nav-left_nav-right'] sm:[grid-template-areas:'nav-left_slider_nav-right'] gap-2 sm:gap-6
                    [&>button]:rounded-full [&>button]:w-10 [&>button]:h-10 [&>button]:shrink-0 [&>button]:text-gray-600 [&>button]:text-2xl
                    [&>button]:transition-all [&>button]:duration-500 [&_button]:relative [&_button]:isolate [&_button]:bg-black
                    sm:[&>button]:mt-8 before:[&>button]:absolute before:[&>button]:inset-px before:[&>button]:transition-all
                    before:[&>button]:duration-300 before:[&>button]:-z-10 before:[&>button]:rounded-full hover:before:[&>button]:inset-full
                    before:[&>button]:bg-white hover:[&>button]:text-white hover:[&>button]:bg-black hover:[&>button]:border-black">
                    <button data-slide="prev" className="[grid-area:nav-left] material-symbols-outlined" onClick={handlePrev}>
                    <IoIosArrowBack className='text-2xl ml-2' />
                    </button>
                    <div id="slider" className="[grid-area:slider]" ref={sliderRef}>
                        <div id="list-cards" className="grid [grid-template-areas:'stack'] overflow-hidden">
                            {REVIEWS.map((review, idx) => (
                                <div key={review.id} className="card [grid-area:stack] opacity-0">
                                    <blockquote className="bg-black text-white rounded-md p-6 text-sm transition-all duration-500 scale-0 relative isolate
                                        before:absolute before:bg-black before:w-4 before:h-4 before:rotate-45 before:-bottom-2 before:left-2/4
                                        before:-translate-x-2/4 before:-z-10 before:-translate-y-full before:transition before:duration-500
                                        before:delay-500">
                                        {`"${review.review}"`}
                                    </blockquote>
                                    <div className="details text-sm translate-y-[150px] transition-all duration-500 flex flex-col items-center gap-2 mt-6">
                                        <img src={review.avatar} alt={review.name} className="w-16 h-16 object-cover rounded-full" />
                                        <div>
                                            <p className="text-sm font-bold">{review.name}</p>
                                            <p className="text-xs">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button data-slide="next" className="[grid-area:nav-right] material-symbols-outlined" onClick={handleNext}>
                    <IoIosArrowForward className='text-2xl ml-2' />
                    </button>
                </div>
            </main>
        </div>
    );
};

export default TestimonialSection;
