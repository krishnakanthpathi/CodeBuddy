
interface LanguageChangerProps {
    code: string;
    setCode: (code: string) => void;
    language: string;
    setLanguage: (language: string) => void;
}


function LanguageChanger(props: LanguageChangerProps) {
    const { setCode, setLanguage } = props;
    const defaultCode: Record<string, string> = {
        "python": '# Write your Python code here...',
        "javascript": '// Write your JavaScript code here...',
        "java": '// Write your Java code here...',
        "csharp": '// Write your C# code here...',
        "cpp": '// Write your C++ code here...'
    }
    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = event.target.value;
        setCode(defaultCode[newLanguage] || "");
        setLanguage(newLanguage);
        console.log('Language changed to:', newLanguage);
    };

    return (
        <div className="flex items-center m-2 space-x-2">
            <label htmlFor="language" className="text-sm font-medium text-gray-700">Language:</label>
            <select id="language" onChange={handleLanguageChange} className="p-2 border border-gray-300 rounded-lg">
                <option value="python" defaultChecked>Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="cpp">C++</option>
            </select>
        </div>
    );
}

export default LanguageChanger;

