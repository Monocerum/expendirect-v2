import AccountIcon from '@/components/common/AccountIcon'
import { PLAN_COLORS, getPlanItems, spentForPlanItem } from '@/utils/budgetPlan'
import { sumAmounts } from '@/utils/finance'
import { formatMoney } from '@/utils/format'

export default function BudgetPlanCard({ plan, account, transactions, onEdit, onDelete }) {
    const income = sumAmounts(transactions.filter((item) => item.type === 'income'))
    const expenses = transactions.filter((item) => item.type === 'expense')
    const items = getPlanItems(plan)
    const hasUnlinkedItem = items.some((item) => !item.key && !item.categoryIds?.length)

    return (
        <section className="card">
            <div className="between">
                <h2>
                    <AccountIcon account={account} /> {account.name}
                </h2>
                <div className="actions row-actions">
                    <button className="link" onClick={onEdit}>
                        Edit
                    </button>
                    <button className="link" onClick={onDelete}>
                        Delete
                    </button>
                </div>
            </div>
            {items.map((item, index) => {
                const budget = (income * item.percent) / 100
                const spent = spentForPlanItem(item, expenses, income)
                const width = budget ? Math.min((spent / budget) * 100, 100) : 0
                const isOver = item.key !== 'savings' && budget > 0 && spent > budget
                return (
                    <div className="plan" key={item.id}>
                        <span>
                            {item.name} · {item.percent}%
                        </span>
                        <div className="bar">
                            <div
                                style={{
                                    width: `${width}%`,
                                    background: isOver ? '#d32f2f' : PLAN_COLORS[index % PLAN_COLORS.length],
                                }}
                            />
                        </div>
                        <small>
                            PHP {formatMoney(spent)} of {formatMoney(budget)}
                        </small>
                    </div>
                )
            })}
            {hasUnlinkedItem && (
                <p className="muted">
                    Edit the plan to link categories to your custom items so their spending is tracked.
                </p>
            )}
        </section>
    )
}