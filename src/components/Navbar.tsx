import {Link} from 'react-router-dom';


function Navbar() {
    return (
        <nav className=" flex justify-between text-black p-2 rounded-lg m-4 shadow-lg">
            <div className="p-2">
                <Link to="/">Code Buddy</Link>
            </div>
            <ul className="flex space-x-4 mt-2">
                <li><Link to="/snippets">My Snippets</Link></li>
                <li><Link className="button bg-yellow-500 text-white p-2 rounded" to="/create">Create Snippet</Link></li>
                <li><Link className="button bg-green-500 text-white p-2 rounded" to="/login">Log in</Link></li>
                <li><Link className="button bg-blue-500 text-white p-2 rounded" to="/signup">Sign up</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;  
