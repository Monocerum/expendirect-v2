import { formatMoney } from '@/utils/format'

export default function CategoryLegend({ groups, onView }) {
    return (
        <ul className="legend">
            {groups.map((group) => (
                <li key={group.id}>
                    <span className="muted">{group.percent}%</span>
                    <i style={{ background: group.color }} />
                    <span>{group.name}</span>
                    <b>PHP{formatMoney(group.total)}</b>
                    <button
                        className="link"
                        aria-label={`View ${group.name} entries`}
                        onClick={() => onView(group.id)}
                    >
                        View
                    </button>
                </li>
            ))}
        </ul>
    )
}