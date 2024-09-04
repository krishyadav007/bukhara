import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';

        const profiles = await db.user.findMany({
            where: {
                username: {
                    contains: search.toLowerCase(),
                },
            },
            select: {
                id: true,
                username: true,
                image: true,
                bio: true,
            },
        });

        return NextResponse.json(profiles);
    } catch (error) {
        console.error('Error in GET /api/profiles:', error);
        return NextResponse.json({ message: 'Error fetching profiles', error: error.message }, { status: 500 });
    }
}