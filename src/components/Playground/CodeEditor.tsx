import { useEffect, useState  } from 'react';
import { useLocation } from 'react-router-dom';

import Editor from '@monaco-editor/react';
import InputOutputPanel from './InputOutputPanel';
import LanguageChanger from './LangagueChanger';
import Utils from './Utils';
import ThemeSelector from './ThemeSelector';

import type { UtilsProps } from '../../types/models';



function CodeEditor() {

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
    const [canEdit, setCanEdit] = useState<boolean>(true);
    
    useEffect(() => {

        if (id) return;
        
        setTimeout(() => {
            
            const date = new Date();
            const HashId = Math.random().toString(36).substring(2, 15);
            const cryptedId = btoa(`${date.getTime()}-${HashId}`);
            setId(cryptedId);
            setCode('# Write your code here... :)');
            setTitle('CodeBuddy Snippet');
            setLanguage('python');
            setTheme('vs-dark');
            setInput('');
            setOutput('');
            console.log("ID Set", cryptedId);
        }, 1000);
    }, []); 
    

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