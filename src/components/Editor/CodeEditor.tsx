import { useEffect, useState } from 'react';

import Editor from '@monaco-editor/react';
import InputOutputPanel from './InputOutputPanel';
import LanguageChanger from './LangagueChanger';
import Utils from './Utils';



function CodeEditor() {
    const [code, setCode] = useState('# Write your code here...');
    const [language, setLanguage] = useState('python');
    const [theme, setTheme] = useState('vs-dark');

    const UtilsProps = {
        code,
        language,
        theme,
        setCode,
        setLanguage,
        setTheme
    };

    const handleEditorChange = (value: string | undefined, event: any) => {
        setCode(value || '');
        console.log('Editor content changed:', value , event);
    };

    
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

            <Utils {...UtilsProps} />
            <InputOutputPanel />
        </div>
    </>
  );
}

export default CodeEditor;