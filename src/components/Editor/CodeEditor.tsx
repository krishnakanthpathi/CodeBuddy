import { useEffect, useState } from 'react';

import Editor from '@monaco-editor/react';
import InputOutputPanel from './InputOutputPanel';
import LanguageChanger from './LangagueChanger';
import Utils from './Utils';
import ThemeSelector from './ThemeSelector';



function CodeEditor() {
    const [code, setCode] = useState('# Write your code here...');
    const [language, setLanguage] = useState('python');
    const [theme, setTheme] = useState('vs-dark');
    const [run, setRun] = useState(false);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

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