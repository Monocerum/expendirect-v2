import { formatMoney } from '@/utils/format'

export default function CategoryCard({
    category,
    typeLabel,
    total,
    isActive,
    onAddEntry,
    onView,
    onEdit,
    onDelete,
}) {
    return (
        <section className={`card catcard${isActive ? ' active' : ''}`}>
            <small className="lbl">Category</small>
            <h2>
                <i className="dot" style={{ background: category.color }} /> {category.name}
            </h2>
            <div className="catctl">
                <span className="pillfield">{typeLabel}</span>
                <button
                    className="btn sq"
                    aria-label={`Add ${typeLabel.toLowerCase()} to ${category.name}`}
                    onClick={onAddEntry}
                >
                    +
                </button>
                <button
                    className="btn sq"
                    aria-label={`View ${category.name} entries to remove`}
                    onClick={onView}
                >
                    −
                </button>
            </div>
            <p className="bal">
                <small>Total</small> <sup>PHP</sup> {formatMoney(total)}
            </p>
            <div className="actions row-actions center-actions">
                <button className="link" onClick={onView}>
                    View
                </button>
                <button className="link" onClick={onEdit}>
                    Edit
                </button>
                <button className="link" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </section>
    )
}