import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { UserProps } from '../types/props';

import ModelAlerts from './Utils/ModelAlerts.tsx';

function Navbar(props: UserProps) {
    const { isAuthenticated , setUser, setIsAuthenticated } = props;
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    const handleLogout = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        setIsLoggingOut(true);
        setTimeout(() => {
            setUser(null);
            setIsAuthenticated(false);
            setIsLoggingOut(false);
            console.log('User logged out');
        }, 1000);
    };

    const handleCreateSnippet = (e: React.MouseEvent) => {
        e.preventDefault();
        setAlertMessage('Are you sure you want to create a new snippet?');
        setAlertOpen(true);
    };

    const createSnippet = () => {
        console.log('Snippet created!');
        navigate('/create');
    }

    return (
        <>
            <ModelAlerts
                title="Create Snippet"
                open={alertOpen}
                message={alertMessage}
                onConfirm={() => { setAlertOpen(false); createSnippet(); }}
                onCancel={() => setAlertOpen(false)}
            />
            <nav className="flex justify-between text-black p-2 rounded-lg m-4 shadow-lg">
                <div className="p-2">
                    <Link to="/"> 
                        <img src="/logo_xl.png" alt="Logo" className="h-9 w-16 inline-block mr-2" />
                        <span className="text-xl font-bold">Code Buddy</span>
                    </Link>
                </div>
                <ul className="flex space-x-4 mt-2">
                    {isAuthenticated && 
                        <li><Link className='button bg-blue-500 text-white p-2 rounded' to="/snippets">My Snippets</Link></li>}

                    {isAuthenticated &&
                        <li>
                            <Link
                                className="button bg-yellow-500 text-white p-2 rounded"
                                to="#"
                                onClick={handleCreateSnippet}
                            >
                                Create Snippet
                            </Link>
                        </li>
                    } 

                    {(isAuthenticated && !isLoggingOut) && (
                        <li>
                            <Link
                                to="#"
                                className="button bg-red-500 text-white p-2 rounded"
                                onClick={handleLogout}
                            >
                                Log out
                            </Link>
                        </li>
                    )}

                    {isLoggingOut && (
                        <li><span className="button bg-gray-500 text-white p-2 rounded">Logging out...</span></li>
                    )}

                    {!isAuthenticated  && (  
                        <li><Link  className="button bg-green-500 text-white p-2 rounded" to="/login">Log in</Link></li>
                    )}
                    {!isAuthenticated && (
                        <li><Link className="button bg-blue-500 text-white p-2 rounded" to="/signup">Sign up</Link></li>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
