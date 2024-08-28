'use client';
import '@/input.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import Post from '@/components/Post';
import { useRouter } from 'next/navigation';

interface PostProps {
  collegeName: string;
  content: string;
  comments: string[];
  postId: number;
}

interface Params {
  userId: string;
}

export default function MyComponent({ params }: { params: Params }) {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const { data } = await axios.get(`/api/users/${params.userId}`);
        console.log(data.message.collegeName)
        if (data.message.collegeName === "") {
          router.push(`/update-college-name?userId=${params.userId}`);
        }
      } catch (error) {
        console.log(`Error fetching user profile: ${error}`);
      }
    }

    fetchUserProfile();
  }, [params.userId, router]);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/posts/random`);
        const newPosts = data.message;
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    }

    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 10) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function Loader({ size }: { size: number }) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RingLoader color="#1f50b8" loading size={size} speedMultiplier={1} />
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-lg p-4">
        <ul>
          <li className="mb-4 flex items-center space-x-2">
            <span className="icon">📄</span>
            <button className="text-gray-700 font-medium" onClick={() => router.push(`/${params.userId}/profile`)}>Profile</button>
          </li>
          <br />
          <li className="mb-4 flex items-center space-x-2">
            <span className="icon">📝</span>
            <button className="text-gray-700 font-medium" onClick={() => router.push(`/${params.userId}/make-post`)}>Make a Post</button>
          </li>
          <br />
          <li className="mb-4 flex items-center space-x-2">
            <span className="icon">🔄</span>
            <button className="text-gray-700 font-medium" onClick={() => router.push('/api/auth/signin')}>Change Account</button>
          </li>
        </ul>
      </div>

      <div className="ml-52 w-full">
        {posts.map((post, index) => (
          <Post
            key={index}
            content={post.content}
            collegeName={post.collegeName}
            comments={post.comments}
            postId={post.postId}
          />
        ))}
        {loading && <Loader size={50} />}
      </div>
    </div>
  );
}
