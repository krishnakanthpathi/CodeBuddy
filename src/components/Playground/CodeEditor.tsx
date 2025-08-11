import { useEffect, useState , useRef } from 'react';

import Editor from '@monaco-editor/react';
import InputOutputPanel from './InputOutputPanel';
import LanguageChanger from './LangagueChanger';
import Utils from './Utils';
import ThemeSelector from './ThemeSelector';


interface snippetState {
    snaps: string;
    timestamp: string;
}


function CodeEditor() {
    const [code, setCode] = useState('# Write your code here...');
    const [language, setLanguage] = useState('python');
    const [theme, setTheme] = useState('vs-dark');
    const [run, setRun] = useState(false);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const [codeHistory, setCodeHistory] = useState<snippetState[]>();

    const codeRef = useRef("");
    useEffect(() => {
        console.log('Code changed:', code);
        codeRef.current = code;
        const interval = setInterval(() => {
            console.log('Auto-saving code:', code);
            const newSnippet: snippetState = {
                snaps: code,
                timestamp: new Date().toISOString(),
            }; 
            if (codeRef.current === code) {
                console.log('No change in code, skipping history update');
                clearInterval(interval);
                console.log('Interval cleared due to no change in code');
                return;
            }
            setCodeHistory((prevHistory) => {
                const updatedHistory = prevHistory ? [...prevHistory, newSnippet] : [newSnippet];
                return updatedHistory;
            });
        }, 1000);
        console.log('Code history updated:', codeHistory , interval);
        localStorage.setItem('codeHistory', JSON.stringify(codeHistory));
        localStorage.setItem('code', code);
        return () => {
            clearInterval(interval);
            console.log('Interval cleared');
        }
    }, [code]);
    
    const UtilsProps = {
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
    <>
        <div className="bg-white-500 text-black p-4 rounded-lg shadow-xl">
            <h2 className="text-2xl  font-bold">Code Editor</h2>
            <div className=''>
                <label className=''>Title : </label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
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
        </div>
    </>
  );
}

export default CodeEditor;