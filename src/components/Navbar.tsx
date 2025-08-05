


function Navbar() {
    return (
        <nav className="flex justify-between text-black p-2 rounded-lg m-4 shadow-lg">
            <div className="p-2">
                <a href="/">Code Buddy</a>
            </div>
            <ul className="flex space-x-4 mt-2">
                <li><a href="/">My Snippets</a></li>
                <li><a className="button bg-green-500 text-white p-2 rounded" href="/about">Log in</a></li>
                <li><a className="button bg-blue-500 text-white p-2 rounded" href="/contact">Sign up</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;  
