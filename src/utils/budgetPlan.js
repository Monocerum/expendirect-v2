import { createId } from './id'
import { sumAmounts } from './finance'

export const PLAN_COLORS = [
    'var(--primary)',
    'var(--secondary)',
    'var(--primary-soft)',
    '#ffc46b',
    '#6bb5ff',
    '#8e7cc3',
    '#58b09c',
    '#f2a65a',
]

export const createStandardPlanItems = () =>
    [
        { key: 'needs', name: 'Needs', percent: 50 },
        { key: 'wants', name: 'Wants', percent: 30 },
        { key: 'savings', name: 'Savings', percent: 20 },
    ].map((item) => ({ id: createId(), categoryIds: [], ...item }))

export const createBlankPlanItem = () => ({ id: createId(), name: '', percent: 0, categoryIds: [] })

export const getPlanItems = (plan) =>
    plan.items ?? [
        { id: 'needs', key: 'needs', name: 'Needs', percent: plan.needs },
        { id: 'wants', key: 'wants', name: 'Wants', percent: plan.wants },
        { id: 'savings', key: 'savings', name: 'Savings', percent: plan.savings },
    ]

export function spentForPlanItem(item, expenses, income) {
    if (item.key === 'savings') return Math.max(income - sumAmounts(expenses), 0)
    if (item.key) return sumAmounts(expenses.filter((expense) => expense.plan === item.key))
    return sumAmounts(expenses.filter((expense) => item.categoryIds?.includes(expense.categoryId)))
}