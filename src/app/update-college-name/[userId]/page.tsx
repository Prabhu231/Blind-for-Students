'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
interface Params {
    userId: String
}

export default function CollegeNameInput() {
  const [collegeName, setCollegeName] = useState('');
  const router = useRouter()
  const pathName = usePathname()
  const path = pathName.split('/')
  const id = path.pop()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`/api/users/${id}/${collegeName}`);
      router.push(`/${id}`)
    } catch (error) {
      console.error('Error submitting college name:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Enter Your College Name</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="collegeName" className="block text-gray-700 font-medium mb-2">
              College Name
            </label>
            <input
              type="text"
              id="collegeName"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
