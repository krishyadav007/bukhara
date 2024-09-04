// components/Stories.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const stories = [
    { id: 1, emoji: "🐘", bgColor: "bg-[#F9F16F]" },
    { id: 2, emoji: "🦁", bgColor: "bg-[#F9F16F]" },
    { id: 3, emoji: "🌟", bgColor: "bg-[#F9F16F]" },
    { id: 4, emoji: "⭐", bgColor: "bg-[#F9F16F]" },
    { id: 5, emoji: "🌈", bgColor: "bg-[#F9F16F]" },
    { id: 6, emoji: "🌞", bgColor: "bg-[#F9F16F]" },
    { id: 7, emoji: "🌙", bgColor: "bg-[#F9F16F]" },
    { id: 8, emoji: "🍎", bgColor: "bg-[#F9F16F]" },
    { id: 7, emoji: "🌙", bgColor: "bg-[#F9F16F]" },
    { id: 8, emoji: "🍎", bgColor: "bg-[#F9F16F]" },
];

const Stories = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 9,
        slidesToScroll: 3,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 9,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
        ],
    };

    return (
        <div className="p-4">
            <Slider {...settings}>
                {stories.map((story) => (
                    <div key={story.id} className="px-2">
                        <div
                            className={`w-16 h-16 flex items-center justify-center text-2xl rounded-md ${story.bgColor}`}
                        >
                            <span className="text-3xl">{story.emoji}</span>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Stories;
