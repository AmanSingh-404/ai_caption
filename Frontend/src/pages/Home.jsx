import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/api/post');
                setPosts(response.data.posts);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div className="text-center mt-10 text-gray-400">Loading feed...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

    return (
        <div className="p-4 max-w-xl mx-auto space-y-6">
            <h2 className="text-xl font-bold mb-4">Feed</h2>
            {posts.length === 0 ? (
                <div className="text-center text-gray-500">No posts yet. Be the first to create one!</div>
            ) : (
                posts.map((post) => (
                    <div key={post._id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                        <div className="p-3 flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs">
                                {post.user?.username?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <span className="font-semibold text-sm">{post.user?.username || 'Unknown User'}</span>
                        </div>
                        <div className="aspect-square bg-black flex items-center justify-center">
                            {post.image && (
                                <img
                                    src={post.image}
                                    alt="Post"
                                    className="max-h-full max-w-full object-contain"
                                />
                            )}
                        </div>
                        <div className="p-3">
                            <p className="text-sm text-gray-300">
                                <span className="font-bold mr-2 text-white">{post.user?.username}</span>
                                {post.caption}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;
