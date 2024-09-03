'use client'
import { useRouter } from 'next/navigation'

export default function SignInButton() {
    const router = useRouter();
    
    return (
        <div className="flex justify-center items-center h-screen">
            <button 
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                onClick={() => router.push('/api/auth/signin')}
            >
                Sign In
            </button>
        </div>
    );
}
