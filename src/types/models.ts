

export interface User {
    id: string;
    username: string;
    password: string;
    snippets: string[];
}



export interface SnippetState {
    id?: string;
    snap: string;
    timestamp: string;
}

export interface SnippetContent {
    code: string;
    input: string;
}


export interface UserProps {
    isAuthenticated: boolean;
    user: User | null;
    setUser: (user: User | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export interface SnippetProps {
    snippets: SnippetContent[];
    setSnippets: (snippets: SnippetContent[]) => void;
}

export interface UtilsProps {
    id?: string;
    code: string;
    language: string;
    theme: string;
    run: boolean;
    input: string;
    output: string;
    setOutput: (output: string) => void;
    setRun: (run: boolean) => void;
    setCode: (code: string) => void;
    setLanguage: (language: string) => void;
    setTheme: (theme: string) => void;
    setInput: (input: string) => void;

}