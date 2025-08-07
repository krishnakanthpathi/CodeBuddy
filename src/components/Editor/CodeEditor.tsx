import { useEffect, useState } from 'react';

import Editor from '@monaco-editor/react';
import InputOutputPanel from './InputOutputPanel';
import LanguageChanger from './LangagueChanger';



function CodeEditor() {
    const [code, setCode] = useState('# Write your code here...');
    const [language, setLanguage] = useState('python');
    const [theme, setTheme] = useState('vs-dark');

    useEffect(() => {
        // Load the Monaco editor and set the initial language and theme
        setCode('# Write your code here...');
        setLanguage('python');
        setTheme('vs-dark');
    }, []);

    const [resetloading, setResetLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [runLoading, setRunLoading] = useState(false);

    const handleEditorChange = (value: string | undefined, event: any) => {
        setCode(value || '');
        console.log('Editor content changed:', value , event);
    };

    const handleEditorReset = () => {
        setResetLoading(true);
        setTimeout(() => {
            setCode('# Write your code here...');
            setLanguage('python');
            setTheme('vs-dark');
            setResetLoading(false);
        }, 1000);
        console.log('Editor content reset');
    }

    const handleEditorSave = () => {
        setSaveLoading(true);
        setTimeout(() => {
            setSaveLoading(false);
        }, 1000);
        console.log('Editor content saved');
    }

    const handleEditorRun = () => {
        setRunLoading(true);
        setTimeout(() => {
            setRunLoading(false);
        }, 1000);
        console.log('Editor content run');
    }
  return (
    <>
        <div className="bg-white-500 text-black p-4 rounded-lg shadow-xl">
            <h2 className="text-2xl  font-bold">Code Editor</h2>
            <LanguageChanger />
            <Editor
                height="400px"
                language={language}
                value={code}
                theme={theme}
                onChange={handleEditorChange}

            />
            <div className="mt-4">
                { !resetloading && <button onClick={handleEditorReset} className="bg-red-500 text-white p-2 rounded mr-2">Reset</button> }
                { resetloading && <button  className="bg-gray-500 text-white p-2 rounded mr-2">Loading...</button> }

                { !saveLoading && <button onClick={handleEditorSave} className="bg-blue-500 text-white p-2 rounded mr-2">Save</button> }
                { saveLoading && <button  className="bg-gray-500 text-white p-2 rounded mr-2">Loading...</button> }

                { !runLoading && <button onClick={handleEditorRun} className="bg-green-500 text-white p-2 rounded">Run</button> }
                { runLoading && <button  className="bg-gray-500 text-white p-2 rounded">Loading...</button> }
            </div>
            <InputOutputPanel />
        </div>
    </>
  );
}

export default CodeEditor;