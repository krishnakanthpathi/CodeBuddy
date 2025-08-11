

function Snippets() {
    return (
        <div className="bg-white-100 p-4 rounded-lg shadow-xl m-4">
            <table className="p-4 min-w-full text-center border-separate border-spacing-2 rounded-lg shadow-lg mr-4 mt-4">
                <caption className="text-lg font-semibold">My Snippets</caption>
                <thead>
                    <tr className="bg-green-100 border border-gray-200">
                        <th className="p-2">Title</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Example row, replace with dynamic data */}
                    <tr>
                        <td className="p-2">Snippet 1</td>
                        <td className="p-2">
                            <button className="bg-yellow-500 text-white p-1 rounded mr-2">View</button>
                            <button className="bg-blue-500 text-white p-1 rounded">Edit</button>
                            <button className="bg-red-500 text-white p-1 rounded ml-2">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Snippets;