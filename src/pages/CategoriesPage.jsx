import { useState } from 'react'
import CategoryCard from '@/components/categories/CategoryCard'
import CategoryEntriesPanel from '@/components/categories/CategoryEntriesPanel'
import CategoryFilterBar from '@/components/categories/CategoryFilterBar'
import CategoryForm from '@/components/categories/CategoryForm'
import SearchInput from '@/components/common/SearchInput'
import TypeToggle from '@/components/common/TypeToggle'
import TransactionForm from '@/components/transactions/TransactionForm'
import { CATEGORY_TYPE_OPTIONS } from '@/constants/transactions'
import { useStore } from '@/hooks/useStore'
import { removeItem } from '@/store/actions'
import { sumAmounts } from '@/utils/finance'
import { formatMoney } from '@/utils/format'

export default function CategoriesPage() {
    const { state, dispatch } = useStore()
    const [type, setType] = useState('expense')
    const [search, setSearch] = useState('')
    const [selectedIds, setSelectedIds] = useState([])
    const [viewedId, setViewedId] = useState(null)
    const [editing, setEditing] = useState(null)
    const [entryDraft, setEntryDraft] = useState(null)

    const categoriesOfType = state.categories.filter((category) => category.type === type)
    const viewedCategory = categoriesOfType.find((category) => category.id === viewedId)
    const activeIds = selectedIds.filter((id) =>
        categoriesOfType.some((category) => category.id === id),
    )
    const selectedCategories = categoriesOfType.filter(
        (category) => !activeIds.length || activeIds.includes(category.id),
    )
    const visibleCategories = selectedCategories.filter((category) =>
        category.name.toLowerCase().includes(search.trim().toLowerCase()),
    )

    const transactionsOf = (categoryId) =>
        state.transactions.filter((item) => item.categoryId === categoryId && item.type === type)
    const total = sumAmounts(selectedCategories.flatMap((category) => transactionsOf(category.id)))
    const typeLabel = type === 'expense' ? 'Expenditure' : 'Income'

    const changeType = (nextType) => {
        setType(nextType)
        setSelectedIds([])
        setViewedId(null)
    }
    const toggleSelected = (id) =>
        setSelectedIds(
            activeIds.includes(id) ? activeIds.filter((other) => other !== id) : [...activeIds, id],
        )

    const handleDelete = (category) => {
        if (!confirm(`Delete ${category.name}? Its entries become uncategorized.`)) return
        if (viewedId === category.id) setViewedId(null)
        dispatch(removeItem('categories', category.id))
    }

    return (
        <>
            <div className="between wrap">
                <p className="muted">
                    Expenditures and income each have their own categories. Only the ones listed here appear
                    when you add an entry.
                </p>
                <button className="btn" onClick={() => setEditing({})}>
                    Add category
                </button>
            </div>
            <TypeToggle value={type} onChange={changeType} options={CATEGORY_TYPE_OPTIONS} />
            <SearchInput value={search} onChange={setSearch} placeholder="Search categories" />
            <CategoryFilterBar
                categories={categoriesOfType}
                selectedIds={activeIds}
                onToggle={toggleSelected}
                onClear={() => setSelectedIds([])}
            />
            <section className="card totalcard">
                <small className="lbl">
                    Total {type === 'expense' ? 'expenditures' : 'income'} ·{' '}
                    {activeIds.length ? `${activeIds.length} selected` : 'all categories'}
                </small>
                <p className="bal">
                    <sup>PHP</sup> {formatMoney(total)}
                </p>
            </section>
            {!visibleCategories.length && <p className="muted">No categories found.</p>}

            <div className={`catlayout${viewedCategory ? ' open' : ''}`}>
                <div className="catlist">
                    {visibleCategories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            typeLabel={typeLabel}
                            total={sumAmounts(transactionsOf(category.id))}
                            isActive={viewedId === category.id}
                            onAddEntry={() => setEntryDraft({ type, categoryId: category.id })}
                            onView={() => setViewedId(category.id)}
                            onEdit={() => setEditing(category)}
                            onDelete={() => handleDelete(category)}
                        />
                    ))}
                </div>
                {viewedCategory && (
                    <CategoryEntriesPanel
                        key={viewedCategory.id}
                        category={viewedCategory}
                        type={type}
                        transactions={transactionsOf(viewedCategory.id)}
                        onClose={() => setViewedId(null)}
                    />
                )}
            </div>

            {editing && (
                <CategoryForm
                    category={editing.id ? editing : null}
                    type={type}
                    onClose={() => setEditing(null)}
                />
            )}
            {entryDraft && (
                <TransactionForm
                    type={entryDraft.type}
                    categoryId={entryDraft.categoryId}
                    onClose={() => setEntryDraft(null)}
                />
            )}
        </>
    )
}