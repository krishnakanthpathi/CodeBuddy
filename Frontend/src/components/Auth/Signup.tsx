import React, { useState } from 'react';
import axios from 'axios';
import type { UserProps } from '../../types/props';
import { Navigate } from 'react-router-dom';
 
function Signup(props : UserProps) {
    // const [user , setUser] = props;
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [signedUp, setSignedUp] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_NODE_URL;
            await axios.post(
                `${apiUrl}/users/signup`,
                {  name, email, password },
            );
            setSignedUp(true);
            // Optionally, redirect to login page or auto-login
            props.setIsAuthenticated(false);
            props.setUser(null);
            // navigate('/login');
        } catch (error) {
            // Handle error (e.g., show error message)
            console.error('Error during signup:', error);
        }
        // navigate('/login');
        
    };

    if (signedUp) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex flex-col items-center justify-center h-100 bg-white-100 m-4 rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
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
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
