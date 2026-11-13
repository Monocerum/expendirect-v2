import { useState } from 'react'
import { useStore } from '@/hooks/useStore'
import { addItem } from '@/store/actions'
import { onEnterKey } from '@/utils/events'

export default function TagPicker({ type, selected, onChange }) {
    const { state, dispatch } = useStore()
    const [draft, setDraft] = useState('')

    const available = [
        ...new Set([
            ...state.tags.filter((tag) => tag.type === type).map((tag) => tag.name),
            ...state.transactions
                .filter((transaction) => transaction.type === type)
                .flatMap((transaction) => transaction.tags ?? []),
        ]),
    ]

    const toggle = (name) =>
        onChange(selected.includes(name) ? selected.filter((tag) => tag !== name) : [...selected, name])

    const addTag = () => {
        const typed = draft.trim()
        if (!typed) return
        const name = available.find((tag) => tag.toLowerCase() === typed.toLowerCase()) ?? typed
        if (!available.includes(name)) dispatch(addItem('tags', { name, type }))
        if (!selected.includes(name)) onChange([...selected, name])
        setDraft('')
    }

    return (
        <div className="row start">
            <span>
                Tags <em>(optional)</em>
            </span>
            <div>
                <div className="chips">
                    {available.map((name) => {
                        const isSelected = selected.includes(name)
                        return (
                            <button
                                type="button"
                                key={name}
                                aria-pressed={isSelected}
                                className={`tagbtn${isSelected ? ' on' : ''}`}
                                onClick={() => toggle(name)}
                            >
                                {name}
                            </button>
                        )
                    })}
                </div>
                <div className="tagadd">
                    <input
                        placeholder="New tag"
                        aria-label="New tag"
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        onKeyDown={onEnterKey(addTag)}
                    />
                    <button type="button" className="btn sm" onClick={addTag}>
                        Add tag
                    </button>
                </div>
            </div>
        </div>
    )
}