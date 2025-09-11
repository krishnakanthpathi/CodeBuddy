import type { User } from './user';

export interface UserProps {
    isAuthenticated: boolean;
    user: User | null;
    setUser: (user: User | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export interface UtilsProps {
    id?: string;
    code: string;
    title: string;
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

export interface ModelAlertsProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

export interface ModelNotifyProps {
    open: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
    duration?: number;
    onClose: () => void;
}