import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { content, postId, userId } = body;
        const comment = await prisma.comment.create({
            data: {
                content,
                post: {
                    connect: { id: postId },
                },
                user: {
                    connect: { id: userId }, 
                },
            },
        });
        return NextResponse.json({ message: comment });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: `Error: ${err}` }, { status: 500 });
    }
}
