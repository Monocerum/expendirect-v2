import Modal from './Modal'

export default function DeleteModal({ title = 'Delete?', message, onConfirm, onClose }) {
    return (
        <Modal title={title} onClose={onClose}>
            <p className="muted">
                {message || 'Are you sure you want to delete this? This action cannot be undone.'}
            </p>

            <div className="modal-actions">
                <button className="cancel-btn" onClick={onClose}>
                    Cancel
                </button>

                <button className="delete-btn" onClick={onConfirm}>
                    Delete
                </button>
            </div>
        </Modal>
    )
}