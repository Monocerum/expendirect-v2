export default function CategoryFilterBar({ categories, selectedIds, onToggle, onClear }) {
    const showingAll = selectedIds.length === 0
    return (
        <div className="catfilter" role="group" aria-label="Filter categories">
            <button className={showingAll ? 'on' : ''} aria-pressed={showingAll} onClick={onClear}>
                All
            </button>
            {categories.map((category) => {
                const isActive = selectedIds.includes(category.id)
                return (
                    <button
                        key={category.id}
                        className={isActive ? 'on' : ''}
                        aria-pressed={isActive}
                        onClick={() => onToggle(category.id)}
                    >
                        {category.name}
                    </button>
                )
            })}
        </div>
    )
}