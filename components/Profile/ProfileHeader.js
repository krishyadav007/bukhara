import React from 'react';

export default function ProfileHeader({ profile }) {
    return (
        <div className="flex flex-col  sm:flex-row items-center mb-8 sm:mb-12">
            <div className="relative">
                <img
                    src={profile.image}
                    alt={profile.username}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-md shadow-md mb-4 sm:mb-0 sm:mr-8 object-cover"
                />
            </div>
            <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl text-[#5C4033] font-light mb-2 sm:mb-4">
                    {profile.username}
                </h1>
                <p className="max-w-md text-[#5C4033]">
                    {profile.bio || "No bio available"}
                </p>
            </div>
        </div>
    );
}