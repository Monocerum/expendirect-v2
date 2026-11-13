import { formatMoney } from '@/utils/format'

export default function BarList({ rows, max }) {
    return (
        <ul className="bars">
            {rows.map((row) => (
                <li key={row.key}>
                    <span>{row.label}</span>
                    <div className="bar">
                        <div
                            style={{
                                width: `${max ? (row.value / max) * 100 : 0}%`,
                                background: row.color || 'var(--primary)',
                            }}
                        />
                    </div>
                    <b>PHP {formatMoney(row.value)}</b>
                </li>
            ))}
        </ul>
    )
}