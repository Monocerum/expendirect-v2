import { createPortal } from 'react-dom'

export default function Modal({ title, onClose, children }) {
    return createPortal(
        <div className="overlay" onClick={onClose}>
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(event) => event.stopPropagation()}
            >
                <button className="x" onClick={onClose} aria-label="Close">
                    ×
                </button>
                {title && <h2>{title}</h2>}
                {children}
            </div>
        </div>,
        document.body,
    )
}