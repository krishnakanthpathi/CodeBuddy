import axios from 'axios';
import React, { useState } from 'react';
import type { UserProps } from '../../types/props';

function Login(props: UserProps) {
    const apiUrl = import.meta.env.VITE_BACKEND_NODE_URL;
    
    if (!apiUrl) {
        return <div>Error: BACKEND_NODE_URL is not defined in environment variables.</div>;
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const authenticateUser = async () => {
        try {
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
            // Log the user data directly from the response
            console.log({
                id: response.data.user.id,
                username: response.data.user.username,
                email: response.data.user.email,
                password: '', // Do not store password
                token: token,
                snippets: response.data.snippets || []
            });
            props.setIsAuthenticated(true);
            localStorage.setItem('token', token);

            console.log('Login successful:', response.data.token);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <>
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
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={authenticateUser}
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
