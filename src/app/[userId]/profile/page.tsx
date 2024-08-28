import axios from 'axios';
import Post from '@/components/Post';

interface PostProps {
  collegeName: string;
  content: string;
  comments: string[];
  postId: number;
}

interface UserDetails {
  collegeName: string;
  createdAt: string;
}

interface Params {
  userId: string;
}

export default async function({ params }: { params: Params }) {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/posts/fetch-details?userId=${params.userId}`);
    const posts: PostProps[] = data.posts;
    const userDetails: UserDetails = data.userDetails;

    return (
      <div className="flex flex-col h-screen w-screen">
        {/* Profile Section */}
        <div className="bg-white p-8 rounded-lg shadow-md max-w-full mb-8 flex-shrink-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile Details</h1>
          <p className="text-xl text-gray-700 mb-2"><strong>College Name:</strong> {userDetails.collegeName}</p>
          <p className="text-xl text-gray-700"><strong>Joined At:</strong> {new Date(userDetails.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Posts Section */}
        <div className="flex-1 overflow-y-auto">
          {posts.map((post, index) => (
            <Post
              key={index}
              content={post.content}
              collegeName={post.collegeName}
              comments={post.comments}
              postId={post.postId}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return <p className="text-center mt-20">Failed to load profile and posts</p>;
  }
}
