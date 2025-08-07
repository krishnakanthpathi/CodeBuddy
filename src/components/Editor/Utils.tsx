
import React, { useState, useEffect } from 'react';

interface UtilsProps {
    code: string;
    language: string;
    theme: string;
    setCode: (code: string) => void;
    setLanguage: (language: string) => void;
    setTheme: (theme: string) => void;
}

function Utils(props: UtilsProps) {
    const { code, language, theme, setCode, setLanguage, setTheme } = props;

    const [resetloading, setResetLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [runLoading, setRunLoading] = useState(false);

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


