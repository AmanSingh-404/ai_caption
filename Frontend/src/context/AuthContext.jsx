import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await api.get('/auth/me');
            setUser(response.data.user);
        } catch (error) {
            console.log("Not authenticated");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (userData) => {
        const response = await api.post('/auth/login', userData);
        // After login, fetch the user details or just set the user if the response contains it
        // Depending on backend, /login might return the user or just a token. 
        // If it returns just a message, we might need to fetch /me again or set user from a separate response.
        // Based on auth.controller.js, login returns { message: "..." }. 
        // So we should call checkAuth() or set user manually if we had the data. 
        // Simplest is to call checkAuth().
        await checkAuth();
        return response;
    };

    const register = async (userData) => {
        const response = await api.post('/auth/register', userData);
        // Register logs the user in (sets cookie), so we should check auth.
        await checkAuth();
        return response;
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
