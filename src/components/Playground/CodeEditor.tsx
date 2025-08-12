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
    const [code, setCode] = useState('# Write your code here... :)');
    const [language, setLanguage] = useState('python');
    const [theme, setTheme] = useState('vs-dark');
    const [title , setTitle] = useState('CodeBuddy Snippet');
    const [run, setRun] = useState(false);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const [codeHistory, setCodeHistory] = useState<snippetState[]>([]);
    
    useEffect(() => {
        localStorage.setItem('code', code);
        localStorage.setItem('language', language);
        localStorage.setItem('theme', theme);
        localStorage.setItem('title', title);
        localStorage.setItem('input', input);
        localStorage.setItem('output', output);
    }, [code, language, theme, title, input, output]);

    useEffect(() => {
        const codeState : snippetState = {
            snaps: code,
            timestamp: new Date().toISOString()
        };
        if (codeHistory.length > 0) {
            const lastSnippet = codeHistory[codeHistory.length - 1];
            const lastTimestamp = new Date(lastSnippet.timestamp);
            const currentTimestamp = new Date();
            const timeDifference = currentTimestamp.getTime() - lastTimestamp.getTime();

            if (timeDifference > 5000) {
                setCodeHistory((prevHistory) => [...prevHistory, codeState]);
                console.log("History Updated", codeHistory);
            } else {
                console.log("Skipping History Update")
            }
           
        }else {
            // If no history exists, create the first snippet
            setCodeHistory((prevHistory) => [...prevHistory, codeState]);
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
        </div>
    </>
  );
}

export default CodeEditor;