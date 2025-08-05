import Editor from '@monaco-editor/react';

function CodeEditor() {
  return (
    <>
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="code-editor">
                <Editor
                    height="400px"
                    defaultLanguage="python"
                    defaultValue="# Write your code here..."
                    theme="vs-dark"
                />              
            </div>
            <div className="flex space-x-2 mt-4">
                <button className="bg-blue-500 text-white p-2 rounded">Run</button>
                <button className="bg-gray-500 text-white p-2 rounded">Reset</button>
                <button className="bg-red-500 text-white p-2 rounded">Clear</button>
                <button className="bg-yellow-500 text-white p-2 rounded">Save</button>
            </div>
            <div className="bg-blue-100 flex space-x-3 p-4 rounded-lg mt-3">
                <div id="InputContainer" className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-gray-600">Input will be Given here.</p>
                </div>
                <div id="OutputContainer" className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-gray-600">Output will be displayed here.</p>
                </div>
            </div>
        </div>
    </>
  );
}

export default CodeEditor;