import AccountIcon from '@/components/common/AccountIcon'
import { buildPlanRows, hasUnlinkedItem } from '@/utils/budgetPlan'
import PlanItemRows from './PlanItemRows'

export default function BudgetPlanCard({ plan, account, transactions, onEdit, onDelete }) {
    const rows = buildPlanRows(plan, transactions)

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
            <PlanItemRows rows={rows} />
            {hasUnlinkedItem(plan) && (
                <p className="muted">
                    Custom items count the expenses you assign to them. Edit the plan to also link categories.
                </p>
            )}
        </section>
    )
}