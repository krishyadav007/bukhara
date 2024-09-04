"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import ProfileCard from '@/components/Profile/ProfileCard';
import Navbar from "../../../../components/Navbar";


export default function UserProfilePage() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // console.log("Fetching data for user ID:", id);
                const response = await fetch(`/api/profile/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                // console.log("Received data:", data);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserData();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData || !userData.user) {
        return <div>User not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 ">
            <div className="container mx-auto px-4">
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="container mx-auto px-4">

                        <ProfileHeader profile={userData.user} />

                        <ProfileCard posts={userData.posts} />
                    </div>
                </div>
            </div>
        </div>
    );
}