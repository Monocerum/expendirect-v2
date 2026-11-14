
import { useState } from 'react'
import BudgetPlanCard from '@/components/budget/BudgetPlanCard'
import BudgetPlanForm from '@/components/budget/BudgetPlanForm'
import { ALL_ACCOUNTS } from '@/constants/accounts'
import { useStore } from '@/hooks/useStore'
import { removeItem } from '@/store/actions'
import { transactionsForPlan } from '@/utils/budgetPlan'

export default function BudgetPlanPage() {
    const { state, dispatch } = useStore()
    const [editing, setEditing] = useState(null)

    const canAddPlan =
        !state.plans.some((plan) => plan.accountId === ALL_ACCOUNTS.id) ||
        state.accounts.some(
            (account) =>
                !state.plans.some((plan) => plan.accountId === account.id)
        )

    return (
        <>
            <div className="between wrap">
                <p className="muted">
                    Split each account’s income (or all accounts together) any way you like: needs, wants, savings, or your own items.
                </p>

                <button
                    className="btn"
                    disabled={!canAddPlan}
                    onClick={() => setEditing({})}
                >
                    Add plan
                </button>
            </div>

            {!state.plans.length && (
                <p className="muted">
                    No plans yet. Add one for an account.
                </p>
            )}

            {state.plans.map((plan) => {
                const account =
                    plan.accountId === ALL_ACCOUNTS.id
                        ? { ...ALL_ACCOUNTS, name: 'All accounts (overall)' }
                        : state.accounts.find(
                            (item) => item.id === plan.accountId
                        )

                if (!account) return null

                return (
                    <BudgetPlanCard
                        key={plan.id}
                        plan={plan}
                        account={account}
                        transactions={transactionsForPlan(
                            plan,
                            state.transactions
                        )}
                        onEdit={() => setEditing(plan)}
                        onDelete={() =>
                            confirm('Delete this plan?') &&
                            dispatch(removeItem('plans', plan.id))
                        }
                    />
                )
            })}

            {editing && (
                <BudgetPlanForm
                    plan={editing.id ? editing : null}
                    onClose={() => setEditing(null)}
                />
            )}
        </>
    )
}