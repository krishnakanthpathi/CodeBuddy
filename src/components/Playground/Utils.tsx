
import { useState } from 'react';

interface UtilsProps {
    code: string;
    language: string;
    theme: string;
    run: boolean;
    input: string;
    setOutput: (output: string) => void;
    setRun: (run: boolean) => void;
    setCode: (code: string) => void;
    setLanguage: (language: string) => void;
    setTheme: (theme: string) => void;
}

function Utils(props: UtilsProps) {
    const { code , input, setRun, language, setCode, setOutput } = props;

    const [resetloading, setResetLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [runLoading, setRunLoading] = useState(false);



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
            localStorage.setItem('code', code);
            localStorage.setItem('language', language);
            localStorage.setItem('input', input);

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


