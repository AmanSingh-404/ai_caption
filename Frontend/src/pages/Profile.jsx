import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, postsRes] = await Promise.all([
                    api.get('/auth/me'),
                    api.get('/api/post/user')
                ]);
                setUser(userRes.data.user);
                setPosts(postsRes.data.posts);
            } catch (error) {
                console.error('Error loading profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center mt-10 text-gray-400">Loading profile...</div>;
    if (!user) return <div className="text-center mt-10 text-red-500">Failed to load profile</div>;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <div className="flex items-center space-x-6 mb-8 p-4 bg-gray-900 rounded-lg border border-gray-800">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-bold">
                    {user.username?.[0]?.toUpperCase()}
                </div>
                <div>
                    <h2 className="text-2xl font-bold">{user.username}</h2>
                    <p className="text-gray-400">@{user.username}</p>
                    <div className="flex space-x-4 mt-4">
                        <div className="text-center">
                            <span className="block font-bold text-lg">{posts.length}</span>
                            <span className="text-xs text-gray-400">Posts</span>
                        </div>
                        {/* Placeholders for followers/following */}
                        <div className="text-center">
                            <span className="block font-bold text-lg">0</span>
                            <span className="text-xs text-gray-400">Followers</span>
                        </div>
                        <div className="text-center">
                            <span className="block font-bold text-lg">0</span>
                            <span className="text-xs text-gray-400">Following</span>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-bold mb-4 border-t border-gray-800 pt-4">Posts</h3>

            {posts.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    No posts yet.
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-1">
                    {posts.map((post) => (
                        <div key={post._id} className="aspect-square bg-black border border-gray-800 relative group">
                            {post.image && (
                                <img
                                    src={post.image}
                                    alt="Post"
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-xs text-white truncate px-2">{post.caption}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
