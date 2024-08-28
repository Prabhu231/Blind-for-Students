import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const userId = Number(req.nextUrl.searchParams.get("userId"));

        const posts = await prisma.post.findMany({
            where: { userId }, 
            include: {
                comments: true, 
            },
        });

        const userDetails = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!userDetails) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const formattedUserDetails = {
            collegeName: userDetails.collegeName,
            createdAt: userDetails.createdAt
        };

        const formattedPosts = posts.map(post => ({
            content: post.content,
            comments: post.comments.map(comment => comment.content),
            postId: post.id
        }));

        return NextResponse.json({ posts: formattedPosts, userDetails: formattedUserDetails });
    } catch (error) {
        return NextResponse.json({ error: `Error: ${error}` }, { status: 500 });
    }
}
