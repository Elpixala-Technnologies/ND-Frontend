import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const REVIEWS = [
    {
        id: 6,
        name: 'Anjali',
        role: 'Data Scientist, Reading "The Guide" by R.K. Narayan',
        avatar: 'https://i.pravatar.cc/150?img=23',
        review: `Absolutely mind-blowing! From graphics to gameplay, it's a virtual masterpiece. I lost track of time in the immersive experience. The storyline is captivating and keeps you hooked for hours. Truly a work of art in the gaming world.`,
    },
    {
        id: 0,
        name: 'Raj',
        role: 'Architect, Reading "The White Tiger" by Aravind Adiga',
        avatar: 'https://i.pravatar.cc/150?img=13',
        review: `A hidden gem for tech enthusiasts. The selection is vast, and the ease of discovering new tech is addictively delightful! Every corner I turned, there was something new and exciting to explore. It's a must-visit for anyone in the tech world.`,
    },
    {
        id: 2,
        name: 'Vikram',
        role: 'DevOps Engineer, Reading "Shantaram" by Gregory David Roberts',
        avatar: 'https://i.pravatar.cc/150?img=8',
        review: `Results speak louder than words. I've never seen progress like this. The workflows are challenging but oh-so-rewarding. Kudos! The efficiency boost is significant, making every task feel achievable. A true asset to our team.`,
    },
    {
        id: 3,
        name: 'Diana',
        role: 'Product Manager, Reading "A Suitable Boy" by Vikram Seth',
        avatar: 'https://i.pravatar.cc/150?img=41',
        review: `It's very easy to customize and categorize lists for new projects/task categories. The user interface is intuitive and saves so much time. Collaboration has never been this smooth. Highly recommended for team management.`,
    },
    {
        id: 13,
        name: 'Eshan',
        role: "Software Engineer, Reading 'Midnight's Children' by Salman Rushdie" ,
        avatar: 'https://i.pravatar.cc/150?img=57',
        review: `An adventure for the curious mind. Every click led to a new discovery. It's like a digital journey through the wonders of the internet. The interface is seamless, making exploration a joy.`,
    },
    {
        id: 4,
        name: 'Fiona',
        role: 'Marketing Specialist, Reading "The God of Small Things" by Arundhati Roy',
        avatar: 'https://i.pravatar.cc/150?img=42',
        review: `Plan, create, and explore seamlessly. This service made my creative dreams a reality. Smooth navigation, and the recommendations were spot on. It's a perfect tool for any marketer looking to innovate.`,
    },
    {
        id: 10,
        name: 'Gaurav',
        role: 'Software Developer, Reading "Interpreter of Maladies" by Jhumpa Lahiri',
        avatar: 'https://i.pravatar.cc/150?img=21',
        review: `A game-changer for organization. Tasks, calendars, notes – everything neatly synced. My life has never been this streamlined. Pure genius! It’s the ultimate tool for anyone looking to maximize productivity.`,
    },
    {
        id: 11,
        name: 'Harsha',
        role: 'Graphic Designer, Reading "The Inheritance of Loss" by Kiran Desai',
        avatar: 'https://i.pravatar.cc/150?img=18',
        review: `Drowning in a sea of creativity. The content here is a visual feast. An endless source of inspiration for my artistic endeavors. The variety and quality of the visuals are unparalleled.`,
    },
    {
        id: 5,
        name: 'Ishaan',
        role: 'CTO, Reading "The Palace of Illusions" by Chitra Banerjee Divakaruni',
        avatar: 'https://i.pravatar.cc/150?img=33',
        review: `Discovering new beats is addictive with this service. The curated playlists are spot-on, and the personalized recommendations are eerily accurate. A music lover's paradise! It’s transformed the way I experience music.`,
    },
    {
        id: 14,
        name: 'Jaya',
        role: 'Software Engineer, Reading "The Guide" by R.K. Narayan',
        avatar: 'https://i.pravatar.cc/150?img=65',
        review: `Reading "The Guide" by R.K. Narayan was a delightful experience. The narrative is both engaging and thought-provoking, capturing the essence of Indian culture. Every page turned felt like a step into the world of Malgudi, making it hard to put down.`,
    },
    {
        id: 15,
        name: 'Priya',
        role: 'Data Analyst, Reading "The God of Small Things" by Arundhati Roy',
        avatar: 'https://i.pravatar.cc/150?img=10',
        review: `I recently read "The God of Small Things" by Arundhati Roy, and it was mesmerizing. The writing style is poetic and evocative, drawing you into the intricate lives of the characters. It's a book that stays with you long after you’ve finished reading.`,
    },
    {
        id: 16,
        name: 'Rahul',
        role: "Product Manager, Reading 'Midnight's Children' by Salman Rushdie",
        avatar: 'https://i.pravatar.cc/150?img=58',
        review: `"Midnight's Children" by Salman Rushdie is an epic tale that intertwines with India's history. The magical realism and rich storytelling make it a compelling read. It's a literary masterpiece that offers both depth and entertainment.`,
    },
    {
        id: 17,
        name: 'Sneha',
        role: 'Marketing Specialist, Reading "The Palace of Illusions" by Chitra Banerjee Divakaruni',
        avatar: 'https://i.pravatar.cc/150?img=43',
        review: `Plan, create, and explore seamlessly. This service made my creative dreams a reality. Smooth navigation, and the recommendations were spot on. It's a perfect tool for any marketer looking to innovate.`,
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
        <div className="bg-white text-slate-800 flex flex-col justify-center items-center relative px-4 rounded-md">
            <main className="bg-white my-16 w-full max-w-7xl rounded-3xl text-center p-8 sm:p-16 [&_*]:ease-in-out drop-shadow-2xl drop-shadow-gray-700">
                <h1 className="text-2xl font-bold">A word from our customers</h1>
                <p className="text-xl">We've been selling books for over 10 years.</p>
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
                                    <blockquote className="bg-black text-white rounded-md p-6 text-base transition-all duration-500 scale-0 relative isolate
                                        before:absolute before:bg-black before:w-4 before:h-4 before:rotate-45 before:-bottom-2 before:left-2/4
                                        before:-translate-x-2/4 before:-z-10 before:-translate-y-full before:transition before:duration-500
                                        before:delay-500">
                                        {`"${review.review}"`}
                                    </blockquote>
                                    <div className="details text-sm translate-y-[150px] transition-all duration-500 flex flex-col items-center gap-2 mt-6">
                                        <img src={review.avatar} alt={review.name} className="w-16 h-16 object-cover rounded-full" />
                                        <div>
                                            <p className="text-lg font-bold">{review.name}</p>
                                            <p className="text-base">{review.role}</p>
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
