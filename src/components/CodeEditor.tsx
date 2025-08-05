
function CodeEditor() {
  return (
    <>
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="code-editor">
                <textarea placeholder="Write your code here..." />
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