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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">

        </div>
    );
}

export default ModelAlerts;