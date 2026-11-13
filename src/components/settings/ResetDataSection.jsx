import { useState } from 'react'
import Modal from '@/components/common/Modal'
import { useStore } from '@/hooks/useStore'
import { resetData } from '@/store/actions'

export default function ResetDataSection() {
    const { dispatch } = useStore()
    const [isConfirming, setIsConfirming] = useState(false)

    const handleReset = () => {
        dispatch(resetData())
        setIsConfirming(false)
    }

    return (
        <>
            <section className="card danger-zone">
                <h2>Reset everything</h2>
                <p className="muted">
                    Erases all your accounts, entries, categories, tags, budget plans, bills and profile, and
                    restores the default settings and color theme.
                </p>
                <button className="btn danger" onClick={() => setIsConfirming(true)}>
                    Reset to defaults
                </button>
            </section>
            {isConfirming && (
                <Modal title="Reset everything?" onClose={() => setIsConfirming(false)}>
                    <p>This permanently deletes all of your data on this device and can’t be undone.</p>
                    <div className="btns">
                        <button className="btn danger" onClick={handleReset}>
                            Yes, erase everything.
                        </button>
                        <button className="link" onClick={() => setIsConfirming(false)}>
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}
        </>
    )
}