

interface ThemeSelectorProps {
    theme: string;
    setTheme: (theme: string) => void;
}

function ThemeSelector(props: ThemeSelectorProps) {
    const { theme, setTheme } = props;

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(event.target.value);
        console.log('Theme changed to:', event.target.value);
    };

    // Render the theme selector
  return (
    <>
        <div className="flex items-center m-2 space-x-2">
            <label htmlFor="theme" className="text-sm font-medium text-gray-700">Theme:</label>
            <select id="theme" onChange={handleThemeChange} className="p-2 border border-gray-300 rounded-lg">
                <option value="vs-dark">Dark</option>
                <option value="light">Light</option>
                <option value="hc-black">High Contrast</option>
                <option value="vs">Visual Studio</option>
                <option value="hc-light">High Contrast Light</option>
            </select>
        </div>
    </>
  );
}

export default ThemeSelector;