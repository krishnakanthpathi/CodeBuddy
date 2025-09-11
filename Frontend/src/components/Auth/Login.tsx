import axios from 'axios';
import React, { useEffect, useState } from 'react';
import type { UserProps } from '../../types/props';
import { Navigate } from 'react-router-dom';

import ModelNotify from '../Utils/ModelNotify.tsx';

function Login(props: UserProps) {
    const apiUrl = import.meta.env.VITE_BACKEND_NODE_URL;


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading  , setLoading] = useState(false);
    const [notifyOpen, setNotifyOpen] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState('');
    const [notifyType, setNotifyType] = useState<'success' | 'error' | 'info'>('info');
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const authenticateUser = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${apiUrl}/users/login`, {
                email,
                password
            });
            const token = response.data.token;
            props.setUser({
                id: response.data.user.id,
                username: response.data.user.username,
                email: response.data.user.email,
                password: '', // Do not store password
                token: token,
                snippets: response.data.snippets || []
            });
            
            props.setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify({
                id: response.data.user.id,
                username: response.data.user.username,
                email: response.data.user.email,
                password: '',
                token: token,
            }));
            localStorage.setItem('token', token);
            console.log('Login successful:', response.data.token);
            
        } catch (error) {
            setNotifyMessage('Login failed. Please check your credentials.');
            setNotifyType('error');
            setNotifyOpen(true);
            props.setIsAuthenticated(false);
            props.setUser(null);
            console.error('Error during login:', error);
        } finally {
            setLoading(false);
        }
    };
    

    if (props.isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return (
        <>  
            <ModelNotify
                open={notifyOpen}
                message={notifyMessage}
                type={notifyType}
                onClose={() => setNotifyOpen(false)}
            />

            <div className="flex flex-col items-center justify-center h-100 bg-white-100 m-4 rounded-lg shadow-xl">
                <h1 className="text-3xl font-bold mb-4">Login</h1>
                <form className="w-full max-w-sm">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        {!loading && <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={authenticateUser}
                        >
                            Log In
                        </button>}
                        {loading && 
                        <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        disabled>
                            loading...
                        </button>
                        }
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
