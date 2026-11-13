import { useState } from 'react'
import ColorSwatchPicker from '@/components/common/ColorSwatchPicker'
import FormRow from '@/components/common/FormRow'
import Modal from '@/components/common/Modal'
import { EXPENSE_PRESETS, INCOME_PRESETS } from '@/constants/categories'
import { useStore } from '@/hooks/useStore'
import { addItem, updateItem } from '@/store/actions'

export default function CategoryForm({ category, type, onClose }) {
    const { state, dispatch } = useStore()
    const [form, setForm] = useState(category ?? { name: '', color: '#dd6b9a', type })
    const presets = type === 'income' ? INCOME_PRESETS : EXPENSE_PRESETS
    const isTaken = (name) =>
        state.categories.some((item) => item.type === (category?.type || type) && item.name === name)

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(category ? updateItem('categories', form) : addItem('categories', form))
        onClose()
    }

    const title = category
        ? 'Edit category'
        : `Add ${type === 'income' ? 'income' : 'expenditure'} category`

    return (
        <Modal title={title} onClose={onClose}>
            <form className="form" onSubmit={handleSubmit}>
                {!category && (
                    <div className="row start">
                        <span>Pick from the list</span>
                        <div className="chips">
                            {presets
                                .filter((preset) => !isTaken(preset.name))
                                .map((preset) => (
                                    <button
                                        type="button"
                                        key={preset.name}
                                        className={`chip${form.name === preset.name ? ' on' : ''}`}
                                        onClick={() => setForm({ ...preset, type })}
                                    >
                                        <i style={{ background: preset.color }} />
                                        {preset.name}
                                    </button>
                                ))}
                        </div>
                    </div>
                )}
                <FormRow label="Name">
                    <input
                        required
                        value={form.name}
                        onChange={(event) => setForm({ ...form, name: event.target.value })}
                    />
                </FormRow>
                <div className="row start">
                    <span>Color</span>
                    <ColorSwatchPicker value={form.color} onChange={(color) => setForm({ ...form, color })} />
                </div>
                <button className="btn">Save category</button>
            </form>
        </Modal>
    )
}