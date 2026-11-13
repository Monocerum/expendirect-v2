import { useState } from 'react'
import BudgetPlanCard from '@/components/budget/BudgetPlanCard'
import BudgetPlanForm from '@/components/budget/BudgetPlanForm'
import { useStore } from '@/hooks/useStore'
import { removeItem } from '@/store/actions'

export default function BudgetPlanPage() {
    const { state, dispatch } = useStore()
    const [editing, setEditing] = useState(null)
    const canAddPlan = state.accounts.some(
        (account) => !state.plans.some((plan) => plan.accountId === account.id),
    )

    return (
        <>
            <div className="between wrap">
                <p className="muted">
                    Split each account’s income any way you like: needs, wants, savings, or your own items
                    such as Travel and Food.
                </p>
                <button className="btn" disabled={!canAddPlan} onClick={() => setEditing({})}>
                    Add plan
                </button>
            </div>
            {!state.plans.length && <p className="muted">No plans yet. Add one for an account.</p>}
            {state.plans.map((plan) => {
                const account = state.accounts.find((item) => item.id === plan.accountId)
                if (!account) return null
                return (
                    <BudgetPlanCard
                        key={plan.id}
                        plan={plan}
                        account={account}
                        transactions={state.transactions.filter((item) => item.accountId === account.id)}
                        onEdit={() => setEditing(plan)}
                        onDelete={() => confirm('Delete this plan?') && dispatch(removeItem('plans', plan.id))}
                    />
                )
            })}
            {editing && (
                <BudgetPlanForm plan={editing.id ? editing : null} onClose={() => setEditing(null)} />
            )}
        </>
    )
}