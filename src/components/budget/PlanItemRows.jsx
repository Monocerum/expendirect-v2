import { formatMoney } from '@/utils/format'

export default function PlanItemRows({ rows }) {
    return rows.map((row) => (
        <div className="plan" key={row.id}>
            <span>
                {row.name} · {row.percent}%
            </span>
            <div className="bar">
                <div style={{ width: `${row.width}%`, background: row.color }} />
            </div>
            <small>
                PHP {formatMoney(row.spent)} of {formatMoney(row.budget)}
            </small>
        </div>
    ))
}