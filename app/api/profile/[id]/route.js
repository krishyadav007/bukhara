import { NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { auth } from "@/auth";

export async function GET(request, { params }) {
    const userId = params.id;
    console.log("Requested userId:", userId);

    if (!userId) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    try {
        const profile = await db.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                bio: true,
                image: true,
            }
        });

        if (!profile) {
            return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
        }

        const posts = await db.post.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                images: true
            }
        });

        const formattedPosts = posts.map((post) => ({
            id: post.id,
            createdAt: post.createdAt,
            images: post.images.map((image) => ({
                id: image.id,
                imageUrl: image.imageUrl,
                desc: image.desc
            })),
            views: 0
        }));

        const userData = {
            user: profile,
            posts: formattedPosts
        };

        console.log("Returned userData:", userData);

        return NextResponse.json(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ message: 'Error fetching user data' }, { status: 500 });
    }
}