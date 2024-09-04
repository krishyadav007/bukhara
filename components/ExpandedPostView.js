"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import {
    HeartIcon,
    UserIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XMarkIcon,
    TrashIcon,
    SwatchIcon,
    PaintBrushIcon,
    AdjustmentsHorizontalIcon
} from "@heroicons/react/24/outline";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSession } from "next-auth/react";

import { AiOutlineFontColors } from "react-icons/ai";

const NextArrow = ({ onClick, currentSlide, slideCount }) => {
    return (
        <button
            className={`absolute top-1/2 right-2 z-10 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg ${currentSlide === slideCount - 1 ? "hidden" : ""
                }`}
            onClick={onClick}
            aria-label="Next Slide"
        >
            <ChevronRightIcon className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
        </button>
    );
};

const PrevArrow = ({ onClick, currentSlide }) => {
    return (
        <button
            className={`absolute top-1/2 left-2 z-10 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg ${currentSlide === 0 ? "hidden" : ""
                }`}
            onClick={onClick}
            aria-label="Previous Slide"
        >
            <ChevronLeftIcon className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
        </button>
    );
};

const ExpandedPostView = ({ post, onClose }) => {
    const { data: session } = useSession();

    const [bgColor, setBgColor] = useState("#C0C0C0");
    const [bgOpacity, setBgOpacity] = useState(0.5);
    const [padding, setPadding] = useState("0.7em");
    const [font, setFont] = useState("#000000")

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        adaptiveHeight: false,
        className: "h-full overflow-hidden"
    };
    const formatText = (text) => {
        // Split the text by newlines, trim each line, and filter out empty lines
        const lines = text.split('\n').map(line => line.trim()).filter(line => line !== '');

        return (
            <div
                className="inline-block"
                style={{
                    color: font,
                    padding: padding,
                    textAlign: "center",
                }}
            >
                {lines.map((line, index) => (
                    <React.Fragment key={index}>
                        <span
                            className="goo"
                            style={{
                                backgroundColor: `${bgColor}${Math.round(bgOpacity * 255).toString(16).padStart(2, '0')}`,
                                padding: "0.1em 1em",
                                borderRadius: "0.5em",
                                boxDecorationBreak: "clone",
                                WebkitBoxDecorationBreak: "clone",
                                whiteSpace: "pre-wrap",
                            }}
                        >
                            {line}
                        </span>
                        {index < lines.length - 1 && <br />}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    const styles = `
   .slick-slider, .slick-list, .slick-track {
    height: 100%;
  }
  .slick-slide > div {
    height: 100%;
  }
   .goo {
      font-size: 0.8rem;
      @media (min-width: 768px) {
        font-size: 1rem;
      }
      line-height: 1.3;
      display: inline; 
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      filter: url('#goo');
    }
    .goo:focus {
      outline: 0;
    }
  `;
    const StyleTag = () => (
        <style dangerouslySetInnerHTML={{ __html: styles }} />
    );


    const splitTextIntoChunks = (text, maxChunkLength) => {
        const words = text.split(' ');
        const chunks = [];
        let currentChunk = '';

        words.forEach(word => {
            if ((currentChunk + ' ' + word).length <= maxChunkLength) {
                currentChunk += (currentChunk ? ' ' : '') + word;
            } else {
                chunks.push(currentChunk);
                currentChunk = word;
            }
        });

        if (currentChunk) {
            chunks.push(currentChunk);
        }

        return chunks;
    };

    const renderImageSlides = () => {
        const slides = [];
        post.images.forEach((img, index) => {
            const textChunks = splitTextIntoChunks(img.desc, 500);

            textChunks.forEach((chunk, chunkIndex) => {
                slides.push(
                    <div key={`${index}-${chunkIndex}`} className="relative h-full">
                        <img
                            src={img.imageUrl}
                            alt={`Post ${post.id} - Image ${index + 1} - Part ${chunkIndex + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            {formatText(chunk)}
                        </div>
                    </div>
                );
            });
        });
        return slides;
    };

    return (
        <div className="fixed inset-0 z-0 flex items-center justify-center bg-black bg-opacity-75 p-4">
            <StyleTag />
            <div className="relative w-full max-w-4xl h-[80vh] flex flex-col md:flex-row bg-white rounded-lg overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 z-20 p-1 bg-white bg-opacity-50 rounded-full"
                >
                    <XMarkIcon className="w-4 h-4 sm:w-6 sm:h-6 text-black" />
                </button>
                <div className="flex flex-col md:flex-row w-full h-full">
                    <div className="order-2 md:order-1 w-full md:w-1/3 p-4 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <UserIcon className="w-6 h-6 text-[#3A1B0F] mr-2 fill-current" />
                                    <span className="text-sm text-[#3A1B0F]">
                                        {session?.user?.name}
                                    </span>
                                </div>
                                {/* <div className="flex items-center space-x-4 md:hidden">
                                    <div className="flex items-center">
                                        <HeartIcon className="w-5 h-5 text-[#3A1B0F] mr-1 fill-current" />
                                        <span className="text-xs sm:text-sm text-[#3A1B0F]">
                                            {post.likes}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <UserIcon className="w-5 h-5 text-[#3A1B0F] mr-1 fill-current" />
                                        <span className="text-xs sm:text-sm text-[#3A1B0F]">
                                            {post.views}
                                        </span>
                                    </div>
                                    <button className="bg-white bg-opacity-50 rounded-full p-1">
                                        <TrashIcon className="w-4 h-4 text-[#3A1B0F] fill-current" />
                                    </button>
                                </div> */}
                            </div>
                            <div className="w-full p-2 overflow-y-auto">
                                <div className="grid grid-cols-3 gap-2 md:grid-cols-1 items-start justify-between space-x-2">
                                    <div className="flex flex-col items-center">
                                        <PaintBrushIcon className="w-20 h-6 text-[#3A1B0F] fill-current mb-1" />
                                        <input
                                            type="color"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="w-full h-8 rounded-md"
                                            title="Background Color"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <AiOutlineFontColors className="w-20 h-6 text-[#3A1B0F] fill-current mb-1" />
                                        <input
                                            type="color"
                                            value={font}
                                            onChange={(e) => setFont(e.target.value)}
                                            className="w-full h-8 rounded-md "
                                            title="Font Color"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <AdjustmentsHorizontalIcon className="w-6 h-6 text-[#3A1B0F] fill-current mb-1" />
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={bgOpacity}
                                            onChange={(e) => setBgOpacity(e.target.value)}
                                            className="w-full h-8"
                                            title="Background Opacity"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="hidden md:flex items-center space-x-4">
                            <div className="flex items-center">
                                <HeartIcon className="w-5 h-5 text-[#3A1B0F] mr-1 fill-current" />
                                <span className="text-xs sm:text-sm text-[#3A1B0F]">
                                    {post.likes}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <UserIcon className="w-5 h-5 text-[#3A1B0F] mr-1 fill-current" />
                                <span className="text-xs sm:text-sm text-[#3A1B0F]">
                                    {post.views}
                                </span>
                            </div>
                            <button className="bg-white bg-opacity-50 rounded-full">
                                <TrashIcon className="w-4 h-4 text-[#3A1B0F] fill-current" />
                            </button>
                        </div> */}
                    </div>
                    <div className="order-1 md:order-2 w-full md:w-2/3 h-[50vh] md:h-full">
                        <Slider {...settings} className="w-full h-full">
                            {renderImageSlides()}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpandedPostView;



