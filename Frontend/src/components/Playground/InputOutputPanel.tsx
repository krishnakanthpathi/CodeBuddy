import React from 'react';

interface InputOutputPanelProps {
    run: boolean;
    setRun: (run: boolean) => void;
    code: string;
    language: string;
    input: string;
    setInput: (input: string) => void; 
    output: string;
    setOutput: (output: string) => void;

}

function InputOutputPanel(props: InputOutputPanelProps) {
    const { input , output , setInput  } = props;

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value);
        console.log('Input changed:', event.target.value);
    };

    return (
    <>
        <div className="grid grid-cols-2 gap-2 rounded-lg mt-3">
            <div id="InputContainer" className="bg-gray-50 p-2 rounded-lg">
                <label htmlFor="input" className="block p-2 text-sm font-medium text-gray-700">Input</label>
                <textarea id="input" value={input} onChange={handleInputChange} className="w-full h-32 p-2 border border-gray-300 rounded-lg" ></textarea>
            </div>
            <div id="OutputContainer" className="bg-gray-50 p-2 rounded-lg">
                <label htmlFor="output" className="block p-2 text-sm font-medium text-gray-700">Output</label>
                <textarea id="output" value={output} className="w-full h-32 p-2 border border-gray-300 rounded-lg" disabled placeholder=""></textarea>
            </div>
        </div>
    </>
        
    );
}
export default InputOutputPanel;