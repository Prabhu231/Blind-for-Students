'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '@/input.css'

export default function MakePostPage() {
    const [postContent, setPostContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter(); 

    const handleSubmit = async () => {
        if (!postContent.trim()) return;

        setIsSubmitting(true);
        try {
            await axios.post('/api/posts/create-post', {
                content: postContent,
                collegeName: 'Your College Name',
                userId: 1, 
            });
            setPostContent(''); 
            router.push('/'); 
        } catch (error) {
            console.error('Error submitting post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Create a New Post</h1>
                <textarea
                    className="w-full h-40 p-4 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your post here..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    disabled={isSubmitting}
                />
                <button
                    onClick={handleSubmit}
                    className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 ease-in-out"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Post'}
                </button>
            </div>
        </div>
    );
}
