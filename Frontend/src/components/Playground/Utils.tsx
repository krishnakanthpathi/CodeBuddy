
import { useEffect, useState } from 'react';

import type { UtilsProps } from '../../types/props';
import type { SnippetState } from '../../types/snippet';


function Utils(props: UtilsProps) {
    const { id , title , code , input, theme , setRun, language, setCode, setOutput } = props;

    const [resetloading, setResetLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [runLoading, setRunLoading] = useState(false);

    useEffect(() => {
        changeEffect();
    }, [code , title , input , language , theme ]);

    
    const changeEffect = () => {
         const snippet : SnippetState = {
            id: id || '',
            snap: code,
            title: title,
            language: language,
            input: input,
            theme: theme,
            timestamp: new Date().toISOString()
        };
        const table = localStorage.getItem('snippets');
        const snippets = table ? JSON.parse(table) : [];

        console.log("Current Snippets in LocalStorage", snippets);
        for (let i = 0; i < snippets.length; i++) {
            if (snippets[i].id === id) {
                snippets[i] = snippet;
                localStorage.setItem('snippets', JSON.stringify(snippets));
                console.log("Snippet Updated id found", snippet);
                return;
            }
        }
        snippets.push(snippet);
        localStorage.setItem('snippets', JSON.stringify(snippets));
        console.log("Snippet State Updated", snippet);
        console.log("Snippets in LocalStorage", JSON.parse(localStorage.getItem('snippets') || '[]'));
    }
    const defaultCode: Record<string, string> = {
        "python": '# Write your Python code here...',
        "javascript": '// Write your JavaScript code here...',
        "java": '// Write your Java code here...',
        "csharp": '// Write your C# code here...',
        "cpp": '// Write your C++ code here...'
    }


    const handleEditorReset = () => {
        setResetLoading(true);
        setTimeout(() => {
            setCode(defaultCode[language] || "");
            setResetLoading(false);
            console.log('Editor content reset to default for language:', language);
        }, 1000);
        console.log('Editor content reset');
    }

    const handleEditorSave = () => {
        setSaveLoading(true);
        setTimeout(() => {
            
            changeEffect();
            console.log('Editor content saved to localStorage');
            setSaveLoading(false);
        }, 1000);
        console.log('Editor content saved');
    }

    const handleEditorRun = () => {
        setRunLoading(true);
        setTimeout(() => {
            setRun(true);
            // Simulate running the code
            setTimeout(() => {

                setOutput(`Output for ${language} code: ${input}`);
                setRun(false);
                setRunLoading(false);
                console.log('Code executed successfully' , {language, input , code});
            }, 1000);
        }, 1000);
        console.log('Editor content run');
    }


    return (
        <>
            
            <div className="mt-4">
                { !resetloading && <button onClick={handleEditorReset} className="bg-red-500 text-white p-2 rounded mr-2">Reset</button> }
                { resetloading && <button  className="bg-gray-500 text-white p-2 rounded mr-2">Loading...</button> }

                { !saveLoading && <button onClick={handleEditorSave} className="bg-blue-500 text-white p-2 rounded mr-2">Save</button> }
                { saveLoading && <button  className="bg-gray-500 text-white p-2 rounded mr-2">Loading...</button> }

                { !runLoading && <button onClick={handleEditorRun} className="bg-green-500 text-white p-2 rounded">Run</button> }
                { runLoading && <button  className="bg-gray-500 text-white p-2 rounded">Loading...</button> }
            </div>
        </>
    );
}

export default Utils;


