// import {ModelNotify} from "../Utils/ModelNotify";
import type { ModelNotifyProps } from "../../types/props";

function ModelNotify(props: ModelNotifyProps) {
    const {
        open,
        message,
        type,
        duration = 3000,
        onClose
    } = props;

    if (!open) return null;

    // Auto close after duration
    setTimeout(() => {
        onClose();
    }, duration);

    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

    return (
        <>
            <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg z-50`}>
                {message}
            </div>
        </>
    );
}

export default ModelNotify;