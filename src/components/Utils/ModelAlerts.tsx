import type { ModelAlertsProps } from '../../types/models';

function ModelAlerts(props : ModelAlertsProps) {
    const {
        open,
        title,
        message,
        onConfirm,
        onCancel,
        confirmText = "OK",
        cancelText = "Cancel"
    } = props;
    if (!open) return null;
    return (
       <>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-6 ">
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="bg-gray-400 text-white px-3 py-1 rounded-md"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-green-500 text-white px-3 py-1 rounded-md"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
       
       </>
    );
}

export default ModelAlerts;