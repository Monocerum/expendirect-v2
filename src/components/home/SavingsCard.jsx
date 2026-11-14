import PlanItemRows from '@/components/budget/PlanItemRows'
import DateFilter from '@/components/common/DateFilter'
import { dateFilterLabel } from '@/utils/date'
import { formatMoney } from '@/utils/format'

export default function SavingsCard({
    area,
    filter,
    onFilterChange,
    saved,
    goal,
    fromPlan = false,
    plans = [],
}) {
    return (
        <section className={`card ${area}`}>
            <small className="lbl">Savings</small>
            <h2>{dateFilterLabel(filter)}</h2>
            <DateFilter value={filter} onChange={onFilterChange} />
            <p className="big-num">
                {formatMoney(saved)} <span className="muted">/ {formatMoney(goal)}</span>
            </p>
            {fromPlan && <p className="muted">Goal based on the savings % in your budget plans.</p>}
            {!plans.length && <p className="muted">No budget plan yet</p>}
            {plans.map((plan) => (
                <div key={plan.id}>
                    <small className="lbl">{plan.name}</small>
                    <PlanItemRows rows={plan.rows} />
                </div>
            ))}
        </section>
    )
}