import { Link } from 'react-router-dom'
import { formatMoney } from '@/utils/format'

export default function TopExpensesCard({ area, periodLabel, categories }) {
    return (
        <section className={`card ${area}`}>
            <small className="lbl">Top expenses</small>
            <h2>{periodLabel}</h2>
            {categories.length ? (
                <ul className="dots">
                    {categories.map((category) => (
                        <li key={category.id}>
                            <i style={{ background: category.color }} />
                            {category.name}
                            <b>PHP {formatMoney(category.total)}</b>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="muted">No expenses yet. Add one from the tracker.</p>
            )}
            <Link className="link" to="/demographics">
                See details
            </Link>
        </section>
    )
}