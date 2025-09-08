import { useState, useEffect } from 'react';
import { Navigate , useNavigate } from "react-router-dom";

import type { UserProps } from '../../types/props';
import type { SnippetState } from '../../types/snippet';

import Modal from '../Utils/ModelAlerts';

function Snippets(props : UserProps) {
    const { user , isAuthenticated } = props;
    
    const [snippets, setSnippets] = useState<SnippetState[]>([]);
    const [loading, setLoading] = useState(true);

    const [confirmEditId, setConfirmEditId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const apiUrl = import.meta.env.VITE_BACKEND_NODE_URL;
    const navigate = useNavigate();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    const fetchSnippets = async () => {
        console.log('Fetching snippets for user:', user);
        try {
            const response = await fetch(apiUrl + `/snippets/${user?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                }
            });
            console.log('Fetch response status:', response);
            if (!response.ok) {
                throw new Error('Failed to fetch snippets');
            }
            const data = await response.json();
            setSnippets(data);
        } catch (error) {
            console.error('Error fetching snippets:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setSnippets([]);
        fetchSnippets();
    }, []);

    const handleEditSnippet = (id: string) => {
        setConfirmEditId(id);
    };

    const confirmEdit = (id: string) => {
        const snippet: SnippetState | undefined = snippets.find(snip => snip.id === id);
        if (!snippet) {
            console.log('Snippet not found:', id);
            setConfirmEditId(null);
            return;
        }
        navigate("/create" , { state: { snippet } });
        console.log('Navigating to edit snippet:', snippet);
        setConfirmEditId(null);
    };

    const handleDeleteSnippet = (id: string) => {
        setConfirmDeleteId(id);
    };

    const confirmDelete = (id: string) => {
        const updatedSnippets = snippets.filter(snippet => snippet.id !== id);
        setSnippets(updatedSnippets);
        localStorage.setItem('snippets', JSON.stringify(updatedSnippets));
        setConfirmDeleteId(null);
    };

    const MapSnips = () => {
        return snippets.map(snippet => (
            <tr key={snippet.id}>
                <td className="p-2">{snippet.title}</td>
                <td className="p-2">{snippet.language}</td>
                <td className="p-2">
                    <button
                        onClick={() => handleEditSnippet(snippet.id)}
                        className="bg-blue-500 text-white p-2 rounded-md"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDeleteSnippet(snippet.id)}
                        className="bg-red-500 text-white p-2 rounded-md ml-2"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));
    };

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
                    {loading && 
                        <tr>
                            <td colSpan={3} className="p-4 text-center">Loading...</td>
                        </tr>
                    }
                    {!loading && <MapSnips />}
                </tbody>
            </table>
            {/* Edit Modal */}
            <Modal
                open={!!confirmEditId}
                title="Confirm Edit"
                message="Are you sure you want to edit this snippet?"
                onConfirm={() => confirmEdit(confirmEditId!)}
                onCancel={() => setConfirmEditId(null)}
                confirmText="Edit"
                cancelText="Cancel"
            />
            {/* Delete Modal */}
            <Modal
                open={!!confirmDeleteId}
                title="Confirm Delete"
                message="Are you sure you want to delete this snippet?"
                onConfirm={() => confirmDelete(confirmDeleteId!)}
                onCancel={() => setConfirmDeleteId(null)}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </div>
    );
}

export default Snippets;