import { useEffect, useRef, useState } from 'react'
import TransactionEntry from '@/components/transactions/TransactionEntry'
import { CATEGORY_VIEW_MODES } from '@/constants/periods'
import { getYearOptions, isInPeriod, periodLabel, todayIso } from '@/utils/date'

export default function CategoryEntriesPanel({ category, type, transactions, onClose }) {
    const today = todayIso()
    const [mode, setMode] = useState('day')
    const [day, setDay] = useState(today)
    const [month, setMonth] = useState(today.slice(0, 7))
    const [year, setYear] = useState(today.slice(0, 4))
    const panelRef = useRef(null)

    useEffect(() => {
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, [])

    const reference = { day, month: `${month}-01`, year: `${year}-01-01`, overall: today }[mode]
    const visible = transactions.filter((item) => isInPeriod(item, { period: mode, reference }))

    return (
        <aside className="card catpanel" ref={panelRef} aria-label={`${category.name} entries`}>
            <div className="between">
                <div className="chips">
                    {CATEGORY_VIEW_MODES.map((option) => (
                        <button
                            key={option}
                            className={`chip${mode === option ? ' on' : ''}`}
                            aria-pressed={mode === option}
                            onClick={() => setMode(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <button className="link" onClick={onClose}>
                    Close
                </button>
            </div>
            <div className="filters">
                {mode === 'day' && (
                    <input
                        type="date"
                        aria-label="Day"
                        value={day}
                        onChange={(event) => setDay(event.target.value)}
                    />
                )}
                {mode === 'month' && (
                    <input
                        type="month"
                        aria-label="Month"
                        value={month}
                        onChange={(event) => event.target.value && setMonth(event.target.value)}
                    />
                )}
                {mode === 'year' && (
                    <select aria-label="Year" value={year} onChange={(event) => setYear(event.target.value)}>
                        {getYearOptions().map((option) => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                )}
            </div>
            <small className="lbl">{periodLabel(mode, reference)}</small>
            <h2>{category.name}</h2>
            {visible.length ? (
                visible.map((item) => (
                    <TransactionEntry
                        key={item.id}
                        transaction={item}
                        color={category.color}
                        name={category.name}
                    />
                ))
            ) : (
                <p className="muted">No {type === 'income' ? 'income' : 'expenditures'} for this period.</p>
            )}
        </aside>
    )
}