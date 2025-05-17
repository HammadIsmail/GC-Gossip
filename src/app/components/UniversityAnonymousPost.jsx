"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function UniversityAnonymousPosts() {
  // Available departments
  const departments = [
    "Computer Science", 
    "Electrical Engineering", 
    "Chemical Engineering", 
    "Textile Engineering", 
    "Mechatronics Engineering"
  ];

  // State variables
  const [posts, setPosts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    header: '',
    body: '',
    department: departments[0],
  });
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Fetch posts based on selected department
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let url = '/api/posts';
        
        if (selectedDepartment !== 'All') {
          url = `/api/posts/${encodeURIComponent(selectedDepartment)}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedDepartment]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value
    });
  };

  // Handle post submission
  const handleSubmit = async () => {
    // Validate inputs
    if (!newPost.header.trim() || !newPost.body.trim()) {
      setFormError('Please fill in both the header and body fields.');
      return;
    }
    
    setSubmitLoading(true);
    
    try {
      // Send post to the API
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      
      const createdPost = await response.json();
      
      // Add the new post to state if we're viewing the correct department
      if (selectedDepartment === 'All' || selectedDepartment === createdPost.department) {
        setPosts(prevPosts => [createdPost, ...prevPosts]);
      }
      
      // Reset form
      setNewPost({
        header: '',
        body: '',
        department: departments[0],
      });
      
      // Close dialog
      setIsDialogOpen(false);
      setFormError('');
    } catch (error) {
      console.error('Error creating post:', error);
      setFormError('Failed to create post. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Format timestamp for display
  const formatTimestamp = (isoString) => {
    return new Date(isoString).toLocaleString();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
            <Link href={"/"}> <h1 className="text-2xl cursor-pointer font-bold">{`UET (FSD) Gossips`}</h1></Link> 
          <button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 font-medium"
          >
            Post Your Thought
          </button>
          <Link href={"/about"}> <button 
           
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 font-medium"
          >
            About This Site
          </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow">
        {/* Department Selection */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedDepartment('All')}
            className={`px-3 py-1 rounded-full ${
              selectedDepartment === 'All' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            All Departments
          </button>
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-3 py-1 rounded-full ${
                selectedDepartment === dept 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent"></div>
            <p className="mt-2 text-gray-600">Loading posts...</p>
          </div>
        )}

        {/* Posts Display */}
        {!loading && (
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold">{post.header}</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {post.department}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700 whitespace-pre-wrap">{post.body}</p>
                  <div className="mt-3 text-gray-500 text-sm">
                    Posted: {formatTimestamp(post.timestamp)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No posts in this department yet. Be the first to share your thoughts!
              </div>
            )}
          </div>
        )}
      </main>

      {/* New Post Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Create New Post</h2>
              <button 
                onClick={() => {
                  setIsDialogOpen(false);
                  setFormError('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4">
              {formError && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                  {formError}
                </div>
              )}
              
              <div className="mb-4">
                <label className="block mb-1 font-medium">Department</label>
                <select
                  name="department"
                  value={newPost.department}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 font-medium">Post Header</label>
                <input
                  type="text"
                  name="header"
                  value={newPost.header}
                  onChange={handleInputChange}
                  placeholder="Enter a title for your post"
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 font-medium">Post Body</label>
                <textarea
                  name="body"
                  value={newPost.body}
                  onChange={handleInputChange}
                  placeholder="Share your thoughts..."
                  rows="5"
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setFormError('');
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                  disabled={submitLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitLoading}
                  className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                    submitLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {submitLoading ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-gray-200 py-4 text-center text-gray-600">
        <p>UET Anonymous Posts Platform</p>
      </footer>
    </div>
  );
}