import { useState } from 'react'
import PlanItemPicker from '@/components/budget/PlanItemPicker'
import FormRow from '@/components/common/FormRow'
import Modal from '@/components/common/Modal'
import TypeToggle from '@/components/common/TypeToggle'
import { BILL_CATEGORY } from '@/constants/categories'
import { useStore } from '@/hooks/useStore'
import { addTransaction, updateTransaction } from '@/store/actions'
import { todayIso } from '@/utils/date'
import { amountOwed } from '@/utils/finance'
import { formatMoney } from '@/utils/format'
import CategoryPicker from './CategoryPicker'
import ExcessNotice from './ExcessNotice'
import TagPicker from './TagPicker'

function createInitialForm({ transaction, type, accountId, categoryId, date, accounts }) {
    if (transaction) {
        return {
            ...transaction,
            amount: String(transaction.amount),
            tags: [...(transaction.tags ?? [])],
            description: transaction.description ?? '',
            notes: transaction.notes ?? '',
            categoryId: transaction.categoryId ?? '',
            plan: transaction.plan || '',
        }
    }
    return {
        type,
        billId: '',
        amount: '',
        accountId: accountId || accounts[0]?.id || '',
        date: date || todayIso(),
        plan: '',
        categoryId: categoryId || '',
        tags: [],
        description: '',
        notes: '',
    }
}

export default function TransactionForm({
    transaction,
    type = 'expense',
    accountId,
    categoryId,
    date,
    onClose,
}) {
    const { state, dispatch } = useStore()
    const [form, setForm] = useState(() =>
        createInitialForm({ transaction, type, accountId, categoryId, date, accounts: state.accounts }),
    )
    const isExpense = form.type === 'expense'
    const updateField = (field) => (event) => setForm({ ...form, [field]: event.target.value })

    const bills = state.payments.filter(
        (payment) => amountOwed(payment) > 0 || (form.billId && payment.id === form.billId),
    )
    const bill = form.billId
        ? state.payments.find((payment) => payment.id === form.billId)
        : undefined
    const alreadyCounted =
        bill && transaction?.billId === bill.id ? Number(transaction.applied ?? transaction.amount) : 0
    const availableBalance = bill ? amountOwed(bill) + alreadyCounted : 0
    const excess = bill ? Math.max((Number(form.amount) || 0) - availableBalance, 0) : 0
    const asksAboutExcess = excess > 0 && Boolean(bill?.recurring)

    const canSubmit =
        Number(form.amount) > 0 &&
        Boolean(form.accountId) &&
        Boolean(form.date) &&
        Boolean(form.description.trim()) &&
        (!isExpense || Boolean(form.plan)) &&
        (!asksAboutExcess || typeof form.useExcess === 'boolean')

    const changeType = (nextType) => {
        if (nextType === form.type) return
        setForm({
            ...form,
            type: nextType,
            categoryId: '',
            tags: [],
            billId: '',
            plan: '',
            useExcess: null,
        })
    }

    const changeBill = (event) => {
        const billId = event.target.value
        const selected = state.payments.find((payment) => payment.id === billId)
        setForm((current) => {
            let categoryId = current.categoryId
            if (selected) categoryId = BILL_CATEGORY.id
            else if (categoryId === BILL_CATEGORY.id) categoryId = ''
            const prefill = selected
                ? {
                    description: current.description || `${selected.name} payment`,
                    amount: current.amount || String(amountOwed(selected)),
                    accountId: selected.accountId,
                }
                : {}
            return { ...current, billId, categoryId, ...prefill }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!canSubmit) return
        const payload = {
            ...form,
            amount: Number(form.amount),
            plan: isExpense ? form.plan : '',
            description: form.description.trim(),
            billId: isExpense ? form.billId || '' : '',
            useExcess: asksAboutExcess && form.useExcess === true,
        }
        dispatch(
            transaction ? updateTransaction({ ...payload, id: transaction.id }) : addTransaction(payload),
        )
        onClose()
    }

    return (
        <Modal title={transaction ? 'Edit entry' : undefined} onClose={onClose}>
            <form onSubmit={handleSubmit} className="form">
                <TypeToggle value={form.type} onChange={changeType} align="full" />

                <FormRow label="Amount">
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        autoFocus
                        value={form.amount}
                        onChange={updateField('amount')}
                    />
                </FormRow>
                <FormRow label="Account">
                    <select required value={form.accountId} onChange={updateField('accountId')}>
                        <option value="">Select account</option>
                        {state.accounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                </FormRow>
                <FormRow label="Date">
                    <input type="date" required value={form.date} onChange={updateField('date')} />
                </FormRow>
                <FormRow label="Description">
                    <input
                        required
                        maxLength="80"
                        placeholder="e.g. Lunch at Jollibee"
                        value={form.description}
                        onChange={updateField('description')}
                    />
                </FormRow>

                {isExpense && (
                    <PlanItemPicker
                        accountId={form.accountId}
                        value={form.plan}
                        onChange={(plan) => setForm((current) => ({ ...current, plan }))}
                    />
                )}

                {isExpense && (
                    <FormRow
                        label={
                            <>
                                Bill payment <em>(optional)</em>
                            </>
                        }
                    >
                        <select value={form.billId || ''} disabled={!bills.length} onChange={changeBill}>
                            <option value="">
                                {bills.length ? 'Not a bill payment' : 'No unpaid bills (add one in Payments)'}
                            </option>
                            {bills.map((payment) => (
                                <option key={payment.id} value={payment.id}>
                                    {payment.name} · due {payment.due} · balance PHP{' '}
                                    {formatMoney(amountOwed(payment))}
                                </option>
                            ))}
                        </select>
                    </FormRow>
                )}
                {isExpense && excess > 0 && (
                    <ExcessNotice
                        excess={excess}
                        balance={availableBalance}
                        billName={bill.name}
                        isRecurring={asksAboutExcess}
                        useExcess={form.useExcess}
                        onChange={(useExcess) => setForm({ ...form, useExcess })}
                    />
                )}

                <CategoryPicker
                    type={form.type}
                    selectedId={form.categoryId}
                    locked={Boolean(form.billId)}
                    includeBill={Boolean(bill)}
                    onSelect={(selectedId) => setForm({ ...form, categoryId: selectedId })}
                />
                <TagPicker
                    type={form.type}
                    selected={form.tags}
                    onChange={(tags) => setForm({ ...form, tags })}
                />

                <FormRow label="Notes (optional)">
                    <textarea rows="3" value={form.notes} onChange={updateField('notes')} />
                </FormRow>
                <button className="btn" disabled={!canSubmit}>
                    {transaction ? 'Save changes' : isExpense ? 'Add expense' : 'Add income'}
                </button>
            </form>
        </Modal>
    )
}