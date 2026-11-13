import { useState } from 'react'
import FormRow from '@/components/common/FormRow'
import Modal from '@/components/common/Modal'
import { useStore } from '@/hooks/useStore'
import { addItem, updateItem } from '@/store/actions'
import { readFileAsDataUrl } from '@/utils/files'

export default function AccountForm({ account, onClose }) {
    const { dispatch } = useStore()
    const [form, setForm] = useState(account ?? { name: '', opening: 0, icon: '' })

    const handleSubmit = (event) => {
        event.preventDefault()
        const values = { ...form, opening: Number(form.opening) || 0 }
        dispatch(account ? updateItem('accounts', values) : addItem('accounts', values))
        onClose()
    }

    return (
        <Modal title={account ? 'Edit account' : 'Add account'} onClose={onClose}>
            <form className="form" onSubmit={handleSubmit}>
                <FormRow label="Account name">
                    <input
                        required
                        autoFocus
                        placeholder="BPI, Travel fund…"
                        value={form.name}
                        onChange={(event) => setForm({ ...form, name: event.target.value })}
                    />
                </FormRow>
                <FormRow label="Opening balance">
                    <input
                        type="number"
                        step="0.01"
                        value={form.opening}
                        onChange={(event) => setForm({ ...form, opening: event.target.value })}
                    />
                </FormRow>
                <FormRow label="Icon">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                            const [file] = event.target.files
                            if (file)
                                readFileAsDataUrl(file, (icon) => setForm((current) => ({ ...current, icon })))
                        }}
                    />
                </FormRow>
                <button className="btn">Save account</button>
            </form>
        </Modal>
    )
}