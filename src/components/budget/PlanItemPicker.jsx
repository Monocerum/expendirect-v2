import { useEffect, useRef } from 'react'
import { useStore } from '@/hooks/useStore'
import { findPlanFor, planItemOptions } from '@/utils/budgetPlan'

export default function PlanItemPicker({ accountId, value, onChange }) {
    const { state } = useStore()
    const options = planItemOptions(state.plans, accountId)
    const hasPlan = Boolean(findPlanFor(state.plans, accountId))

    const previousAccountId = useRef(accountId)
    useEffect(() => {
        if (previousAccountId.current === accountId) return
        previousAccountId.current = accountId
        if (value && !options.some((option) => option.value === value)) onChange('')
    }, [accountId])

    return (
        <div className="row start">
            <span>Budget plan</span>
            <div>
                <div className="chips" role="group" aria-label="Budget plan item">
                    {options.map((option) => (
                        <button
                            type="button"
                            key={option.value}
                            aria-pressed={value === option.value}
                            className={`chip ${option.key ?? ''}${value === option.value ? ' on' : ''}`}
                            onClick={() => onChange(option.value)}
                        >
                            <i />
                            {option.label}
                        </button>
                    ))}
                </div>
                {!value && <p className="muted">Choose where this expense belongs.</p>}
                {!hasPlan && (
                    <p className="muted">
                        This account has no budget plan yet, so the standard needs and wants are used.
                    </p>
                )}
            </div>
        </div>
    )
}