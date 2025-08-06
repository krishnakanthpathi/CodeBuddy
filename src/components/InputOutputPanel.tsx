
function InputOutputPanel() {
    return (
    <>
        <div className="flex space-x-3 p-4 rounded-lg mt-3">
            <div id="InputContainer" className="bg-gray-50 p-2 rounded-lg">
                <label htmlFor="input" className="block p-2 text-sm font-medium text-gray-700">Input</label>
                <textarea className="w-full h-32 p-2 border border-gray-300 rounded-lg" placeholder="Enter your input here..."></textarea>
            </div>
            <div id="OutputContainer" className="bg-gray-50 p-2 rounded-lg">
                <label htmlFor="output" className="block p-2 text-sm font-medium text-gray-700">Output</label>
                <textarea className="w-full h-32 p-2 border border-gray-300 rounded-lg" placeholder=""></textarea>
            </div>
        </div>
    </>
        
    );
}
export default InputOutputPanel;