import { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from "next-auth";
import { prisma } from '@/lib/prisma';

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async signIn({ profile }) {
            if (!profile?.email) {
                throw new Error('No profile');
            }
            const user = await prisma.user.upsert({
                where: {
                    email: profile.email
                },
                create: {
                    email: profile.email,
                    collegeName: "" 
                },
                update: {}
            });

            return `/${user.id}`;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
