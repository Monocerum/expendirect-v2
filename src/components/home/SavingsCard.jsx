import DateFilter from '@/components/common/DateFilter'
import { dateFilterLabel } from '@/utils/date'
import { formatMoney } from '@/utils/format'

export default function SavingsCard({ area, filter, onFilterChange, saved, goal }) {
    return (
        <section className={`card ${area}`}>
            <small className="lbl">Savings</small>
            <h2>{dateFilterLabel(filter)}</h2>
            <DateFilter value={filter} onChange={onFilterChange} />
            <p className="big-num">
                {formatMoney(saved)} <span className="muted">/ {formatMoney(goal)}</span>
            </p>
            <p className="muted">PHP {formatMoney(Math.max(goal - saved, 0))} to reach goal</p>
        </section>
    )
}