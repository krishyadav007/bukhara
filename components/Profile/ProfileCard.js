"use client";
import React, { useState } from "react";
import { HeartIcon, UserIcon } from "@heroicons/react/24/outline";
import ExpandedPostView from "../ExpandedPostView";
import Link from 'next/link';

const PostCard = ({ posts }) => {
    const [expandedPost, setExpandedPost] = useState(null);

    const likePost = async (postId) => {
        // Implement like functionality
    };

    const incrementViews = async (postId) => {
        // Implement view increment functionality
    };

    const handleImageClick = (post) => {
        setExpandedPost({
            ...post,
            images: post.images
        });
        incrementViews(post.id);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="relative cursor-pointer"
                        onClick={() => handleImageClick(post)}
                    >
                        <div className="w-full h-64 object-cover rounded-md shadow-md relative">
                            {post.images && post.images.length > 0 ? (
                                <img
                                    src={post.images[0].imageUrl}
                                    alt={`Post ${post.id} Image 1`}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                                    <span className="text-gray-500 font-bold text-lg">
                                        No Image
                                    </span>
                                </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black bg-opacity-50 text-white font-semibold text-lg px-4 py-2 rounded-md text-center max-w-[80%]">
                                    {post.images && post.images.length > 0
                                        ? post.images[0].desc.slice(0, 100) + (post.images[0].desc.length > 100 ? '...' : '')
                                        : ""}
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            {expandedPost && (
                <ExpandedPostView
                    post={expandedPost}
                    onClose={() => setExpandedPost(null)}
                />
            )}
        </div>
    );
};

export default PostCard;