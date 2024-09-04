"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Home = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [profiles, setProfiles] = useState([]);
    const [showProfiles, setShowProfiles] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchProfiles = async (search = "") => {
        try {
            const response = await fetch(`/api/profiles?search=${encodeURIComponent(search)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProfiles(data);
            setShowProfiles(true);
        } catch (error) {
            console.error("Error fetching profiles:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        fetchProfiles(e.target.value);
    };

    const handleProfileSelect = (profileId) => {
        router.push(`/profile/${profileId}`);
    };

    return (
        <div className="container mx-auto p-4">
            <form className="mb-4">
                <input
                    type="text"
                    placeholder="Search profiles by username"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 border rounded"
                />
            </form>
            {showProfiles ? (
                profiles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {profiles.map(profile => (
                            <div
                                key={profile.id}
                                className="border p-4 rounded cursor-pointer hover:bg-gray-100"
                                onClick={() => handleProfileSelect(profile.id)}
                            >
                                <div className="flex items-center mb-2">
                                    <img
                                        src={profile.image}
                                        alt={profile.name || "Profile"}
                                        width={40}
                                        height={40}
                                        className="rounded-full mr-2"
                                        onError={(e) => {
                                            e.target.onerror = null;

                                        }}
                                    />
                                    <div>
                                        <p className="text-sm text-gray-500">@{profile.username}</p>
                                    </div>
                                </div>
                                {/* <p className="text-sm mb-2">{profile.bio}</p> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No result found</p>
                )
            ) : null}
        </div>
    );
};

export default Home;