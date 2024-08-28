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

export async function POST(req: NextRequest) {
    try{
        const pathName = req.nextUrl.pathname
        const pathArr = pathName.split('/')
        return NextResponse.json({message: pathArr})
        const userId = Number(pathArr.pop())
        const collegeName = pathArr.pop()
        

    const details = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            collegeName
        }
    })
    return NextResponse.json({message: details})
}
    catch(err) {
        return NextResponse.json({message: err})
    }
}