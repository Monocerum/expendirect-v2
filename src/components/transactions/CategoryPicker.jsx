import { useState } from 'react'
import { BILL_CATEGORY, CATEGORY_SWATCHES } from '@/constants/categories'
import { useStore } from '@/hooks/useStore'
import { addItem } from '@/store/actions'
import { readableTextColor } from '@/utils/color'
import { createId } from '@/utils/id'
import NewCategoryPanel from './NewCategoryPanel'

export default function CategoryPicker({ type, selectedId, locked, includeBill, onSelect }) {
    const { state, dispatch } = useStore()
    const [draft, setDraft] = useState(null)

    const ofType = state.categories.filter((category) => category.type === type)
    const hasBillCategory = state.categories.some((category) => category.id === BILL_CATEGORY.id)
    const visible = includeBill && !hasBillCategory ? [...ofType, BILL_CATEGORY] : ofType

    const saveDraft = () => {
        const name = draft.name.trim()
        if (!name) return
        const id = createId()
        dispatch(addItem('categories', { id, name, color: draft.color, type }))
        onSelect(id)
        setDraft(null)
    }

    return (
        <div className="row start">
            <span>
                Categories <em>(optional)</em>
            </span>
            <div>
                <div className="chips">
                    {visible.map((category) => {
                        const isSelected = selectedId === category.id
                        return (
                            <button
                                type="button"
                                key={category.id}
                                aria-pressed={isSelected}
                                className={`catchip${isSelected ? ' on' : ''}`}
                                style={{ background: category.color, color: readableTextColor(category.color) }}
                                disabled={locked}
                                onClick={() => onSelect(isSelected ? '' : category.id)}
                            >
                                {isSelected && '✓ '}
                                {category.name}
                            </button>
                        )
                    })}
                    {!draft && (
                        <button
                            type="button"
                            className="catchip add"
                            onClick={() => setDraft({ name: '', color: CATEGORY_SWATCHES[0] })}
                        >
                            + Add category
                        </button>
                    )}
                </div>
                {draft && (
                    <NewCategoryPanel
                        draft={draft}
                        onChange={setDraft}
                        onSave={saveDraft}
                        onCancel={() => setDraft(null)}
                    />
                )}
            </div>
        </div>
    )
}