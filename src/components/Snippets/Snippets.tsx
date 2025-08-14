import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import type { UserProps } from '../../types/models';
interface SnippetView {
    id: number;
    title: string;
    language: string;
}

function Snippets(props : UserProps) {
    const { isAuthenticated } = props;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    const [snippets, setSnippets] = useState<SnippetView[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching snippets
        setTimeout(() => {
            const snips = localStorage.getItem('snippets');
            if (snips) {
                setSnippets(JSON.parse(snips));
            }
            
            setLoading(false);
        }, 1000);
    }, []);

    const MapSnips = () => {
        return snippets.map(snippet => (
            <tr key={snippet.id}>
                <td className="p-2">{snippet.title}</td>
                <td className="p-2">{snippet.language}</td>
                <td className="p-2">
                    <button className="bg-yellow-500 text-white p-1 rounded mr-2">View</button>
                    <button className="bg-blue-500 text-white p-1 rounded">Edit</button>
                    <button className="bg-red-500 text-white p-1 rounded ml-2">Delete</button>
                </td>
            </tr>
        ));
    }
    

    return (
        <div className="bg-white-100 p-4 rounded-lg shadow-xl m-4">
            <table className="p-4 min-w-full text-center border-separate border-spacing-2 rounded-lg shadow-lg mr-4 mt-4">
                <caption className="text-lg font-semibold">My Snippets</caption>
                <thead>
                    <tr className="bg-green-100 border border-gray-200">
                        <th className="p-2">Title</th>
                        <th className="p-2">Lang :)</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Example row, replace with dynamic data */}
                    {loading && 
                        <tr>
                            <td colSpan={2} className="p-4 text-center">Loading...</td>
                        </tr>
                    }

                    

                    {!loading && 
                        <MapSnips />
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Snippets;