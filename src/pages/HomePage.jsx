import { useState } from 'react'
import { Link } from 'react-router-dom'
import BillsCard from '@/components/home/BillsCard'
import SavingsCard from '@/components/home/SavingsCard'
import TopExpensesCard from '@/components/home/TopExpensesCard'
import TotalCard from '@/components/home/TotalCard'
import { ALL_ACCOUNTS } from '@/constants/accounts'
import { useStore } from '@/hooks/useStore'
import { buildPlanRows, planSavingsSummary, transactionsForPlan } from '@/utils/budgetPlan'
import { EMPTY_DATE_FILTER, dateFilterLabel, filterByMonthYear, parseIsoDate } from '@/utils/date'
import { sumAmounts } from '@/utils/finance'
import { groupByCategory } from '@/utils/transactions'

export default function HomePage() {
    const { state } = useStore()
    const now = new Date()
    const [expenseFilter, setExpenseFilter] = useState(EMPTY_DATE_FILTER)
    const [incomeFilter, setIncomeFilter] = useState(EMPTY_DATE_FILTER)
    const [savingsFilter, setSavingsFilter] = useState({
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        overall: false,
    })

    const expenses = state.transactions.filter((item) => item.type === 'expense')
    const income = state.transactions.filter((item) => item.type === 'income')
    const shownExpenses = filterByMonthYear(expenses, expenseFilter)
    const topCategories = groupByCategory(shownExpenses, state.categories).slice(0, 3)
    const planSummary =
        state.settings.goalSource === 'plan'
            ? planSavingsSummary(state.plans, state.accounts, state.transactions, savingsFilter)
            : null
    const saved =
        planSummary?.saved ??
        sumAmounts(filterByMonthYear(income, savingsFilter)) -
            sumAmounts(filterByMonthYear(expenses, savingsFilter))
    const goal = planSummary?.goal ?? (Number(state.settings.goal) || 0)
    const planCards = state.plans
        .map((plan) => {
            const account =
                plan.accountId === ALL_ACCOUNTS.id
                    ? { name: ALL_ACCOUNTS.name }
                    : state.accounts.find((item) => item.id === plan.accountId)
                                if (!account) return null
            const inPeriod = filterByMonthYear(
                transactionsForPlan(plan, state.transactions),
                savingsFilter,
            )
            return { id: plan.id, name: account.name, rows: buildPlanRows(plan, inPeriod) }
        })
        .filter(Boolean)
    const billsThisMonth = state.payments.filter((bill) => {
        const due = parseIsoDate(bill.due)
        return due.getMonth() === now.getMonth() && due.getFullYear() === now.getFullYear()
    })

    return (
        <div className="grid home">
            <TotalCard
                area="a"
                label="Total expenses"
                filter={expenseFilter}
                onFilterChange={setExpenseFilter}
                amount={sumAmounts(shownExpenses)}
                linkTo="/tracker?type=expense"
                linkLabel="See expenses"
            />
            <TopExpensesCard
                area="b"
                periodLabel={dateFilterLabel(expenseFilter)}
                categories={topCategories}
            />
            <TotalCard
                area="c"
                label="Total income"
                filter={incomeFilter}
                onFilterChange={setIncomeFilter}
                amount={sumAmounts(filterByMonthYear(income, incomeFilter))}
                linkTo="/tracker?type=income"
                linkLabel="See income"
            />
            <SavingsCard
                area="d"
                filter={savingsFilter}
                onFilterChange={setSavingsFilter}
                saved={saved}
                goal={goal}
                fromPlan={Boolean(planSummary)}
                plans={planCards}
            />
            <BillsCard area="e" bills={billsThisMonth} month={now.getMonth()} year={now.getFullYear()} />
            <Link to="/demographics" className="btn big">
                See demographics
            </Link>
        </div>
    )
}