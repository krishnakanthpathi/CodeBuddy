import { useState, useEffect } from 'react';
import { Navigate , useNavigate } from "react-router-dom";

import type { UserProps } from '../../types/models';
import type { SnippetState } from '../../types/models';

function Modal({
    open,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Yes",
    cancelText = "No"
}: {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}) {
    if (!open) return null;
    return (   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-6 ">
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="bg-gray-400 text-white px-3 py-1 rounded-md"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-green-500 text-white px-3 py-1 rounded-md"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Snippets(props : UserProps) {
    const { isAuthenticated } = props;
    const [snippets, setSnippets] = useState<SnippetState[]>([]);
    const [loading, setLoading] = useState(true);

    const [confirmEditId, setConfirmEditId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    const navigate = useNavigate();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        setTimeout(() => {
            const snips = localStorage.getItem('snippets');
            if (snips) {
                setSnippets(JSON.parse(snips));
            }
            setLoading(false);
        }, 1000);
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