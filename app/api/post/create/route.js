import { db } from '../../../../lib/db';

export async function POST(req) {
    try {
        // Parse the incoming JSON data
        const { postItems, userId } = await req.json();

        // Validate input
        if (!Array.isArray(postItems) || !userId) {
            return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
        }

        // Create a new post
        const newPost = await db.post.create({
            data: {
                userId: userId,

                images: {
                    create: postItems.map(item => ({
                        imageUrl: item.bgImageUrl,
                        desc: item.text,
                    }))
                }
            },
            include: {
                images: true // Include images in the response if needed
            }
        });

        // Prepare the response data
        const responseData = {
            post: newPost,
            message: 'Post successfully created!'
        };
        console.log('Raw server response:', responseData);

        return new Response(JSON.stringify(responseData), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error creating post:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
