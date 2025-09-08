import type { UtilsProps } from "../../types/props";



function LanguageChanger(props: UtilsProps) {
    const { language  } = props;
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.setLanguage(e.target.value);
        console.log('Language changed to:', e.target.value);
    }
    return (
        <div className="flex items-center m-2 space-x-2">
            <label htmlFor="language" className="text-sm font-medium text-gray-700">Language:</label>
            <select id="language" value={language} onChange={handleLanguageChange} className="p-2 border border-gray-300 rounded-lg">
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="cpp">C++</option>
            </select>
        </div>
    );
}

export default LanguageChanger;

