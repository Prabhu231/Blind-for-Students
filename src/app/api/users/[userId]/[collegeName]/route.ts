import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try{
        const pathName = req.nextUrl.pathname
        const pathArr = pathName.split('/')
        const collegeName = pathArr.pop()
        const userId = Number(pathArr.pop())
        

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