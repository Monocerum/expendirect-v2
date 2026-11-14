import { useState } from 'react'
import FormRow from '@/components/common/FormRow'
import Modal from '@/components/common/Modal'
import { ALL_ACCOUNTS } from '@/constants/accounts'
import { useStore } from '@/hooks/useStore'
import { addItem, updateItem } from '@/store/actions'
import { createBlankPlanItem, createStandardPlanItems, getPlanItems } from '@/utils/budgetPlan'

const isEvenSplit = (total) => Math.abs(total - 100) < 0.001

export default function BudgetPlanForm({ plan, onClose }) {
    const { state, dispatch } = useStore()
    const availableAccounts = [...state.accounts, ALL_ACCOUNTS].filter(
        (account) => plan || !state.plans.some((item) => item.accountId === account.id),
    )
    const expenseCategories = state.categories.filter((category) => category.type === 'expense')

    const [accountId, setAccountId] = useState(plan?.accountId ?? availableAccounts[0]?.id ?? '')
    const [items, setItems] = useState(() =>
        plan
            ? getPlanItems(plan).map((item) => ({ categoryIds: [], ...item }))
            : createStandardPlanItems(),
    )

    const total = items.reduce((sum, item) => sum + (Number(item.percent) || 0), 0)
    const canSave =
        Boolean(accountId) &&
        items.length > 0 &&
        isEvenSplit(total) &&
        items.every((item) => item.name.trim())

    const patchItem = (id, changes) =>
        setItems(items.map((item) => (item.id === id ? { ...item, ...changes } : item)))

    const toggleCategory = (item, categoryId) => {
        const linked = item.categoryIds.includes(categoryId)
            ? item.categoryIds.filter((id) => id !== categoryId)
            : [...item.categoryIds, categoryId]
        patchItem(item.id, { categoryIds: linked })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!canSave) return
        const cleaned = items.map((item) => ({
            ...item,
            name: item.name.trim(),
            percent: Number(item.percent) || 0,
        }))
        dispatch(
            plan
                ? updateItem('plans', { id: plan.id, accountId, items: cleaned })
                : addItem('plans', { accountId, items: cleaned }),
        )
        onClose()
    }

    const remaining = +(100 - total).toFixed(2)

    return (
        <Modal title={plan ? 'Edit plan' : 'Add plan'} onClose={onClose}>
            <form className="form" onSubmit={handleSubmit}>
                <FormRow label="Account">
                    <select
                        disabled={Boolean(plan)}
                        value={accountId}
                        onChange={(event) => setAccountId(event.target.value)}
                    >
                        {availableAccounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.id === ALL_ACCOUNTS.id ? 'All accounts (overall)' : account.name}
                            </option>
                        ))}
                    </select>
                </FormRow>
                <div className="chips">
                    <button
                        type="button"
                        className="chip"
                        onClick={() => setItems(createStandardPlanItems())}
                    >
                        Needs · Wants · Savings
                    </button>
                    <button type="button" className="chip" onClick={() => setItems([createBlankPlanItem()])}>
                        Custom split
                    </button>
                </div>
                {items.map((item) => (
                    <div className="planrow" key={item.id}>
                        <input
                            aria-label="Name"
                            placeholder="e.g. Travel, Food"
                            value={item.name}
                            onChange={(event) => patchItem(item.id, { name: event.target.value })}
                        />
                        <input
                            type="number"
                            aria-label="Percent"
                            min="0"
                            max="100"
                            step="0.1"
                            value={item.percent}
                            onChange={(event) => patchItem(item.id, { percent: event.target.value })}
                        />
                        <span>%</span>
                        <button
                            type="button"
                            className="link"
                            aria-label={`Remove ${item.name || 'item'}`}
                            onClick={() => setItems(items.filter((other) => other.id !== item.id))}
                        >
                            Remove
                        </button>
                        {item.key ? (
                            <small className="muted">
                                {item.key === 'savings'
                                    ? 'Counts the income left after expenses.'
                                    : `Counts expenses marked “${item.key}”.`}
                            </small>
                        ) : (
                            <div className="linkcats">
                                <small>Counts expenses assigned to it, and spending from:</small>
                                {expenseCategories.map((category) => {
                                    const isLinked = item.categoryIds.includes(category.id)
                                    return (
                                        <button
                                            type="button"
                                            key={category.id}
                                            className={`tagbtn${isLinked ? ' on' : ''}`}
                                            aria-pressed={isLinked}
                                            onClick={() => toggleCategory(item, category.id)}
                                        >
                                            {category.name}
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="btn sm"
                    onClick={() => setItems([...items, createBlankPlanItem()])}
                >
                    + Add item
                </button>
                <p className={isEvenSplit(total) ? 'muted' : 'err'}>
                    Total: {+total.toFixed(2)}%
                    {!isEvenSplit(total) &&
                        ` — ${remaining > 0 ? `${remaining}% left to assign` : `${-remaining}% over`}`}
                </p>
                <button className="btn" disabled={!canSave}>
                    Save plan
                </button>
            </form>
        </Modal>
    )
}