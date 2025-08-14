import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import type { UserProps } from '../../types/models';

import type { SnippetState } from '../../types/models';

function Snippets(props : UserProps) {
    const { isAuthenticated } = props;
    const [snippets, setSnippets] = useState<SnippetState[]>([]);
    const [loading, setLoading] = useState(true);
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

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

    const handleViewSnippet = (id: string) => {
        console.log(`Viewing snippet with ID: ${id}`);
        const snippet: SnippetState | undefined = snippets.find(snip => snip.id === id);
        if (snippet) {
            // Navigate to snippet details page or show modal
            console.log('Snippet found:', snippet);
            
            
        } else {
            console.log('Snippet not found:', id);
        }
    };

    const handleEditSnippet = (id: string) => {
        console.log(`Editing snippet with ID: ${id}`);
        // Navigate to edit snippet page or show modal
    };

    const handleDeleteSnippet = (id: string) => {
        console.log(`Deleting snippet with ID: ${id}`);
        const updatedSnippets = snippets.filter(snippet => snippet.id !== id);
        setSnippets(updatedSnippets);
        localStorage.setItem('snippets', JSON.stringify(updatedSnippets));
        console.log('Snippet deleted:', id);
    };


    const MapSnips = () => {
        return snippets.map(snippet => (
            <tr key={snippet.id}>
                <td className="p-2">{snippet.title}</td>
                <td className="p-2">{snippet.language}</td>
                <td className="p-2">
                    <button onClick={() => handleViewSnippet(snippet.id)} className="bg-yellow-500 text-white p-1 rounded mr-2">View</button>
                    <button onClick={()=> handleEditSnippet(snippet.id)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                    <button onClick={()=> handleDeleteSnippet(snippet.id)} className="bg-red-500 text-white p-1 rounded ml-2">Delete</button>
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