import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import api from '../api/axios';

const CreatePost = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async () => {
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
            await api.post('/api/post', formData);
            navigate('/');
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Create Post</h2>

            <div className="mb-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className="border-2 border-dashed border-gray-700 rounded-lg h-64 flex flex-col items-center justify-center text-gray-500 hover:border-gray-500 transition-colors cursor-pointer bg-gray-900"
                >
                    {preview ? (
                        <img src={preview} alt="Preview" className="h-full object-contain" />
                    ) : (
                        <>
                            <Upload size={48} className="mb-2" />
                            <span>Click to upload image</span>
                        </>
                    )}
                </label>
            </div>

            <button
                onClick={handleSubmit}
                disabled={!file || loading}
                className={`w-full p-3 rounded font-bold transition-colors ${!file || loading
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
            >
                {loading ? 'Generating Caption & Posting...' : 'Create Post with AI Caption'}
            </button>
        </div>
    );
};

export default CreatePost;
