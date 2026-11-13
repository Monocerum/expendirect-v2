import BarList from '@/components/charts/BarList'
import { BUDGET_BUCKETS } from '@/constants/transactions'
import { useStore } from '@/hooks/useStore'
import { MONTHS, parseIsoDate } from '@/utils/date'
import { sumAmounts } from '@/utils/finance'
import { groupByCategory } from '@/utils/transactions'

const MONTHS_SHOWN = 6

function buildMonthlyTotals(expenses, income, now = new Date()) {
    return Array.from({ length: MONTHS_SHOWN }, (_, index) => {
        const month = new Date(now.getFullYear(), now.getMonth() - (MONTHS_SHOWN - 1) + index, 1)
        const inMonth = (item) => {
            const date = parseIsoDate(item.date)
            return date.getMonth() === month.getMonth() && date.getFullYear() === month.getFullYear()
        }
        return {
            label: `${MONTHS[month.getMonth()].slice(0, 3)} ${month.getFullYear()}`,
            expenses: sumAmounts(expenses.filter(inMonth)),
            income: sumAmounts(income.filter(inMonth)),
        }
    })
}

export default function DemographicsPage() {
    const { state } = useStore()
    if (!state.transactions.length) {
        return (
            <p className="muted">
                No data yet. Add income or expenses in the tracker to see your demographics.
            </p>
        )
    }

    const expenses = state.transactions.filter((item) => item.type === 'expense')
    const income = state.transactions.filter((item) => item.type === 'income')
    const categories = groupByCategory(expenses, state.categories)
    const months = buildMonthlyTotals(expenses, income)
    const monthlyMax = Math.max(...months.flatMap((month) => [month.expenses, month.income]), 0)

    return (
        <div className="grid two">
            <section className="card">
                <h2>Spending by category</h2>
                <BarList
                    max={categories[0]?.total}
                    rows={categories.map((group) => ({
                        key: group.id,
                        label: group.name,
                        value: group.total,
                        color: group.color,
                    }))}
                />
            </section>
            <section className="card">
                <h2>Needs vs wants</h2>
                <BarList
                    max={sumAmounts(expenses)}
                    rows={BUDGET_BUCKETS.map((bucket) => ({
                        key: bucket,
                        label: bucket,
                        value: sumAmounts(expenses.filter((item) => item.plan === bucket)),
                    }))}
                />
            </section>
            <section className="card span">
                <h2>Last {MONTHS_SHOWN} months</h2>
                <BarList
                    max={monthlyMax}
                    rows={months.flatMap((month) => [
                        {
                            key: `${month.label}-expenses`,
                            label: `${month.label} expenses`,
                            value: month.expenses,
                        },
                        {
                            key: `${month.label}-income`,
                            label: `${month.label} income`,
                            value: month.income,
                            color: 'var(--secondary)',
                        },
                    ])}
                />
            </section>
        </div>
    )
}