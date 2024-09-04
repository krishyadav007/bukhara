import { db } from '../../../../lib/db';
import { auth } from "@/auth"


export async function GET(req) {
    const session = await auth();
    const userId = session?.user?.id;
    try {
        const posts = await db.post.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                },
                images: true
            }
        });

        const formattedPosts = posts.map((post) => ({
            id: post.id,
            userId: post.userId,
            createdAt: post.createdAt,
            images: post.images.map((image) => ({
                id: image.id,
                imageUrl: image.imageUrl,
                desc: image.desc
            })),
            // likes: post.Like.length,
            views: 0 // Replace with the actual view count
        }));

        return new Response(JSON.stringify(formattedPosts), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}