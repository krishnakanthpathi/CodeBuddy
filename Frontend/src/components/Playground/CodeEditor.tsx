import { use, useEffect, useState  } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import axios from 'axios';

import Editor from '@monaco-editor/react';
import InputOutputPanel from './InputOutputPanel';
import LanguageChanger from './LangagueChanger';
import Utils from './Utils';
import ThemeSelector from './ThemeSelector';

import type { UserProps, UtilsProps } from '../../types/props';



function CodeEditor(props : UserProps) {

    const { user , isAuthenticated } = props;

    if (!isAuthenticated) {
        return <div>Please log in to access the code editor.</div>;
    }

    const location = useLocation();
    
    // Extract snippet data from location state if available
    const snippet = location.state?.snippet;
    const [code, setCode] = useState<string>( snippet?.snap || '# Write your code here... :)');
    const [title, setTitle] = useState<string>(snippet?.title || 'CodeBuddy Snippet');
    const [language, setLanguage] = useState<string>(snippet?.language || 'python');
    const [theme, setTheme] = useState<string>(snippet?.theme || 'vs-dark');
    const [input, setInput] = useState<string>(snippet?.input || '');
    const [output, setOutput] = useState<string>('');
    const [run, setRun] = useState<boolean>(false);
    const [id, setId] = useState<string | undefined>(snippet?.id || null);
    // const [canEdit, setCanEdit] = useState<boolean>(true);

    const updateSnippet = async (snippetData : any) => {
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_NODE_URL ;
            const response = await axios.put(apiUrl + `/snippets/snippet/${snippetData?.id}`, snippetData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`,
                },
            });
            console.log('Snippet updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating snippet:', error);
        }
    };
    

    useEffect(() => {
        if (id) {
            updateSnippet({ id, title, code, language });
            return;
        };
        const create = async () => {
            try {
                const apiUrl = import.meta.env.VITE_BACKEND_NODE_URL ;
                const res = await axios.post(apiUrl + '/snippets/create', {
                    "user_id": user?.id,
                    "title": title,
                    "code": code,
                    "language": language,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user?.token}`,
                    },
                });
                console.log('Snippet created successfully:', res.data);
                setId(res.data.id);
            
            } catch (error) {
                console.error('Error creating snippet:', error);
            }
        };
        create();
    }, [code , title , language ]); 
        

    const UtilsProps : UtilsProps = {
        id,
        title,
        code,
        language,
        theme,
        run,
        setRun,
        setCode,
        setLanguage,
        setTheme,
        input,
        setInput,
        output,
        setOutput,
    };

    const handleEditorChange = (value: string | undefined, event: any) => {
        setCode(value || '');
        console.log('Editor content changed:', value , event);
    };            


  return (
    <> { id &&
        <div className="bg-white-500 text-black p-4 rounded-lg shadow-xl">
            <h2 className="text-2xl  font-bold">Code Editor</h2>
            <div className=''>
                <label className='' >Title : </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter input for your code"
                    className="border p-2 rounded mt-2"
                />

            </div>
            <div className="flex justify-between m-2">
                <LanguageChanger {...UtilsProps} />
                <ThemeSelector {...UtilsProps} />
            </div>

            <Editor
                height="400px"
                language={language}
                value={code}
                theme={theme}
                onChange={handleEditorChange}
            />

            <Utils {...UtilsProps} />

            <InputOutputPanel {...UtilsProps} />
        </div>}
        
        {!id &&
        <div className="bg-white-500 h-100  text-black p-4 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold">Loading Code Editor...</h2>
            <p>Please wait while we set up your coding environment.</p>
        </div>
        }
    </>
  );
}

export default CodeEditor;