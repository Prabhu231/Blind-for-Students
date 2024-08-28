import { NextRequest, NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'

export async function GET() {
  const posts = await prisma.post.findMany({
    take: 3,
    include: {
      user: {
        select: {
          collegeName: true,
        },
      },
      comments: true
    },
  });

  const formattedPosts = posts.map(post => ({
    content: post.content,
    collegeName: post.user.collegeName,
    comments: post.comments.map(comment => comment.content),
    postId: post.id 
  }));
  return NextResponse.json({ message: formattedPosts });
}
