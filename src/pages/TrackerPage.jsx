import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import AccountSelect from '@/components/common/AccountSelect'
import SearchInput from '@/components/common/SearchInput'
import TypeToggle from '@/components/common/TypeToggle'
import Modal from '@/components/common/Modal'
import PieChart from '@/components/charts/PieChart'
import TransactionEntry from '@/components/transactions/TransactionEntry'
import TransactionForm from '@/components/transactions/TransactionForm'
import CategoryGroupCard from '@/components/tracker/CategoryGroupCard'
import CategoryLegend from '@/components/tracker/CategoryLegend'
import DatePickLink from '@/components/tracker/DatePickLink'
import PeriodTabs from '@/components/tracker/PeriodTabs'
import { useStore } from '@/hooks/useStore'
import { isInPeriod, periodLabel, todayIso } from '@/utils/date'
import { accountBalance, sumAmounts } from '@/utils/finance'
import { formatMoney } from '@/utils/format'
import { groupByCategory, matchesSearch } from '@/utils/transactions'

export default function TrackerPage() {
    const { state } = useStore()
    const [searchParams] = useSearchParams()
    const [accountId, setAccountId] = useState(
        searchParams.get('account') || state.accounts[0]?.id || '',
    )
    const [type, setType] = useState(searchParams.get('type') === 'income' ? 'income' : 'expense')
    const [period, setPeriod] = useState('day')
    const [reference, setReference] = useState(todayIso())
    const [rangeEnd, setRangeEnd] = useState(todayIso())
    const [search, setSearch] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [viewedGroupId, setViewedGroupId] = useState(null)

    const transactions = state.transactions.filter(
        (item) =>
            item.accountId === accountId &&
            item.type === type &&
            isInPeriod(item, { period, reference, to: rangeEnd }),
    )
    const groups = groupByCategory(transactions, state.categories)
    const searchedGroups = groupByCategory(
        transactions.filter((item) => matchesSearch(item, search, state.categories)),
        state.categories,
    )
    const viewedGroup = groups.find((group) => group.id === viewedGroupId)
    const heading = periodLabel(period, reference, rangeEnd)
    const total = sumAmounts(transactions)

    useEffect(() => {
        if (viewedGroupId && !viewedGroup) setViewedGroupId(null)
    }, [viewedGroupId, viewedGroup])

    return (
        <>
            <div className="between">
                <div>
                    <small className="lbl">Account</small>
                    <AccountSelect value={accountId} onChange={setAccountId} />
                </div>
                <p className="bal">
                    <small>Balance</small> <sup>PHP</sup> {formatMoney(accountBalance(state, accountId))}
                </p>
            </div>

            <TypeToggle value={type} onChange={setType} />

            <section className="card">
                <div className="split">
                    <PeriodTabs value={period} onChange={setPeriod} />
                    <div className="grow">
                        <small className="lbl">{period === 'day' ? 'Date' : period}</small>
                        <h2 className="date-h">{heading}</h2>
                        {period !== 'overall' && (
                            <div className="datepicks">
                                <DatePickLink
                                    label={period === 'period' ? 'From' : 'Change date'}
                                    value={reference}
                                    onChange={setReference}
                                />
                                {period === 'period' && (
                                    <DatePickLink
                                        label="To"
                                        value={rangeEnd}
                                        min={reference}
                                        onChange={setRangeEnd}
                                    />
                                )}
                            </div>
                        )}
                        <div className="pie-wrap">
                            <PieChart groups={groups} total={total} />
                            <div className="amt-col">
                                <button
                                    className="plus"
                                    onClick={() => setIsFormOpen(true)}
                                    aria-label={`Add ${type}`}
                                >
                                    +
                                </button>
                                <p className="stack-amt">
                                    <span>PHP</span>
                                    <b>{formatMoney(total)}</b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="rule" />
                <CategoryLegend groups={groups} onView={setViewedGroupId} />
                {!groups.length && (
                    <p className="muted center">
                        Nothing here yet. Use + to add {type === 'income' ? 'income' : 'an expense'}.
                    </p>
                )}
            </section>

            <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search category, tag or note"
                label="Search categories, tags or notes"
            />
            {search && !searchedGroups.length && <p className="muted">No matches for “{search}”.</p>}
            <div className="grid cards3">
                {searchedGroups.map((group) => (
                    <CategoryGroupCard key={group.id} group={group} heading={heading} />
                ))}
            </div>

            {viewedGroup && (
                <Modal title={viewedGroup.name} onClose={() => setViewedGroupId(null)}>
                    <small className="lbl">{heading}</small>
                    {viewedGroup.items.map((item) => (
                        <TransactionEntry
                            key={item.id}
                            transaction={item}
                            color={viewedGroup.color}
                            name={viewedGroup.name}
                        />
                    ))}
                </Modal>
            )}
            {isFormOpen && (
                <TransactionForm
                    type={type}
                    accountId={accountId}
                    date={period === 'overall' ? todayIso() : reference}
                    onClose={() => setIsFormOpen(false)}
                />
            )}
        </>
    )
}