import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { collegeName, content, userId } = body;
        const post = await prisma.post.create({
            data: {
                title: collegeName, 
                content: content,
                userId: userId
            }
        });

        return NextResponse.json({ message: post });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "failed" }, { status: 500 });
    }
}
