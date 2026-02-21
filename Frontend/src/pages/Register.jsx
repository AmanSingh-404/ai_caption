import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="w-full max-w-sm p-6 border border-gray-800 rounded-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">AI Insta</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-900 border border-gray-800 rounded focus:outline-none focus:border-white"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-900 border border-gray-800 rounded focus:outline-none focus:border-white"
                    />
                    <button className="w-full bg-blue-600 p-3 rounded font-bold hover:bg-blue-700 transition-colors">
                        Sign up
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-400">
                    Have an account? <Link to="/login" className="text-blue-500">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
