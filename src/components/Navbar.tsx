import {Link} from 'react-router-dom';
import { useState } from 'react';

interface User {
    id: string;
    username: string;
    password: string;
}

interface UserProps {
    isAuthenticated: boolean;
    user: User | null;
    setUser: (user: User | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

function Navbar(props: UserProps) {
    const { isAuthenticated, user, setUser, setIsAuthenticated } = props;
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const handleLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            setUser(null);
            setIsAuthenticated(false);
            setIsLoggingOut(false);
            console.log('User logged out');
        }, 1000);
    };

    const handleLogin = () => {
        setUser({ id: '1', username: 'testuser', password: 'password' });
        setIsAuthenticated(true);
        console.log('User logged in');
    };

    return (
        <nav className=" flex justify-between text-black p-2 rounded-lg m-4 shadow-lg">
            <div className="p-2">
                <Link to="/">Code Buddy</Link>
            </div>
            <ul className="flex space-x-4 mt-2">
                {isAuthenticated && 
                    <li><Link className='button bg-blue-500 text-white p-2 rounded' to="/snippets">My Snippets</Link></li>}

                {isAuthenticated &&
                    <li><Link className="button bg-yellow-500 text-white p-2 rounded" to="/create">Create Snippet</Link></li>}

                {(isAuthenticated && !isLoggingOut) &&  (
                    <li><Link onClick={handleLogout} className="button bg-red-500 text-white p-2 rounded" to="/logout">Log out</Link></li>
                )}

                {isLoggingOut && (
                    <li><Link className="button bg-gray-500 text-white p-2 rounded" to="/home">Logging out...</Link></li>
                )}

                {!isAuthenticated  && (  
                    <li><Link onClick={handleLogin} className="button bg-green-500 text-white p-2 rounded" to="/login">Log in</Link></li>
                )}
                {!isAuthenticated && (
                    <li><Link className="button bg-blue-500 text-white p-2 rounded" to="/signup">Sign up</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;  
