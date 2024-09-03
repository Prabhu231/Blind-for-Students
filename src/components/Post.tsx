'use client'
import '@/input.css'
import { useState } from 'react';
import axios from 'axios';

interface PostProps {
    content: String;
    collegeName?: String;
    comments: String[];
    postId: number
}

export default function Post({ content, collegeName, comments, postId }: PostProps) {
    const [openComments, setOpenComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [allComments, setAllComments] = useState(comments); // Use a local state to manage comments

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') return; 

        try {
            const response = await axios.post('/api/posts/comments', {
                postId,
                content: newComment,
                userId: 1,
            });

            const { message } = response.data;
            setAllComments(prevComments => [...prevComments, message.content]);
            setNewComment('');
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-5xl mx-auto">
            <div className="text-xl font-bold text-gray-900 mb-2">
                {collegeName}
            </div>
            <div className="text-gray-700 mb-4">
                {content}
            </div>
            <div className="border-t border-gray-200 pt-4">
                <button 
                    type="button" 
                    className="relative inline-flex items-center justify-center px-4 py-2 mb-4 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 ease-in-out"
                    onClick={() => setOpenComments(prevCommentsState => !prevCommentsState)}
                >
                    {openComments ? "Hide Comments" : "Show Comments"}
                </button>
                {openComments && (
                    <>
                        <div className="mb-4">
                            {allComments.map((comment, index) => (
                                <div key={index} className="mb-2">
                                    <p className="text-gray-600">{comment}</p>
                                    <hr className="my-2" />
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                            <input
                                type="text"
                                value={newComment}
                                onChange={handleCommentChange}
                                className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                                placeholder="Add a comment..."
                            />
                            <button
                                type="button"
                                onClick={handleCommentSubmit}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 ease-in-out"
                            >
                                Submit
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
