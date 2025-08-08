import {Link} from 'react-router-dom';

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

                {isAuthenticated ? (
                    <li><Link className="button bg-red-500 text-white p-2 rounded" to="/logout">Log out</Link></li>
                ) : (
                    <li><Link className="button bg-green-500 text-white p-2 rounded" to="/login">Log in</Link></li>
                )}
                {!isAuthenticated && (
                    <li><Link className="button bg-blue-500 text-white p-2 rounded" to="/signup">Sign up</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;  
