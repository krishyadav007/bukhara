import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { auth } from "@/auth";

export async function GET(request) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const profile = await db.user.findUnique({
            where: { id: userId },
            select: {
                username: true, bio: true, image: true,
            }
        });

        if (!profile) {
            return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json({ message: 'Error fetching profile' }, { status: 500 });
    }
}

export async function PUT(request) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();


        const updatedProfile = await db.user.update({
            where: { id: userId },
            data: {
                username: body.username,
                bio: body.bio,
                image: body.image
            }
        });

        return NextResponse.json(updatedProfile);
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ message: 'Error updating profile', error: error.message }, { status: 500 });
    }
}