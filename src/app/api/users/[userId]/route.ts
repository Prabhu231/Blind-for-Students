import { NextRequest, NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'


export async function GET(req: NextRequest) {
    try{
        const pathName = req.nextUrl.pathname
        const userId = Number(pathName.split('/').pop());

    const details = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    return NextResponse.json({message: details?.collegeName})}
    catch(err) {
        return NextResponse.json({message: `${err}`})
    }
}

