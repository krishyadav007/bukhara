// PostCard.js
"use client";
import React, { useState, useEffect } from "react";
import ExpandedPostView from "./ExpandedPostView";
import Stories from "./Stories";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PostCard = () => {
    // const samplePosts = [
    //     {
    //         id: 1,
    //         images: [
    //             {
    //                 desc: "The lush greenery surrounds us, a soothing balm for the soul, as the gentle rustle of leaves and the sweet fragrance of blooming flowers fill the air. The vibrant hues of emerald and olive, the soft textures of moss and ferns, all blend together to create a tapestry of tranquility, inviting us to step into its calming embrace.",
    //                 id: 19,
    //                 imageUrl: "https://plus.unsplash.com/premium_photo-1675127366476-98e3f3acca8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGdyZWVuZXJ5fGVufDB8fDB8fHww",
    //             },
    //             {
    //                 desc: "The sun shines bright, a fiery orb in the sky, casting a warm glow over the landscape. Its rays dance across the earth, bringing light and life to all they touch, illuminating the world with a radiant beam, that chases away the shadows, and fills our hearts with joy.",
    //                 id: 19,
    //                 imageUrl: "https://plus.unsplash.com/premium_photo-1676320526001-07b75bd19ae3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VufGVufDB8fDB8fHww",
    //             },
    //         ],
    //     },
    //     {
    //         id: 2,
    //         images: [
    //             {
    //                 desc: "The sun shines bright, a fiery orb in the sky, casting a warm glow over the landscape. Its rays dance across the earth, bringing light and life to all they touch, illuminating the world with a radiant beam, that chases away the shadows, and fills our hearts with joy.",
    //                 id: 19,
    //                 imageUrl: "https://plus.unsplash.com/premium_photo-1676320526001-07b75bd19ae3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VufGVufDB8fDB8fHww",
    //             },
    //         ],
    //     },
    //     {
    //         id: 3,
    //         images: [
    //             {
    //                 desc: "The majestic mountain stands tall, a sentinel of stone, its rugged peaks reaching for the sky, its ancient wisdom etched on its weathered face. The snow-capped summit glistens like a diamond, as the wind whispers secrets in its ear, and the trees cling to its slopes, like lovers embracing their beloved",
    //                 id: 19,
    //                 imageUrl: "https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW58ZW58MHx8MHx8fDA%3D",
    //             },
    //         ],
    //     },
    // ];

    const [Posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/post/all/');
            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }
            const data = await response.json();
            // console.log(data);
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    
    const [expandedPost, setExpandedPost] = useState(null);

    const handleImageClick = (post) => {
        setExpandedPost(post);
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* <Stories /> */}
                <h1 className="text-center pb-2 text-[#3A1B0F] font-md">Recently posted</h1>
                <div className="grid grid-cols-1 gap-4">
                    {Posts.map((post) => (
                        <div key={post.id} className="relative aspect-w-16 aspect-h-6 h-dvh mb-8">
                            {post.images && post.images.length > 0 ? (
                                <Slider {...settings} className="h-full">
                                    {post.images.map((image, imgIndex) => (
                                        <div
                                            key={imgIndex}
                                            className="relative h-full"
                                            onClick={() => handleImageClick(post)}
                                        >
                                            <img
                                                src={image.imageUrl}
                                                alt={`Post ${post.id} - Image ${imgIndex + 1}`}
                                                className="w-full h-dvh object-cover rounded-md shadow-md"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                                                <p className="text-white text-sm md:text-base lg:text-lg bg-black bg-opacity-40 font-bold px-4 py-2 text-center leading-relaxed max-w-[80%]">{image.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md shadow-md"> {/* Fixed height to 64 (16rem) */}
                                    <span className="text-gray-500">No image available</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {expandedPost && (
                <ExpandedPostView post={expandedPost} onClose={() => setExpandedPost(null)} />
            )}
        </div>
    );
};

export default PostCard;
