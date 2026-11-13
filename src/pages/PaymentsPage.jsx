import { useState } from 'react'
import PayBillForm from '@/components/payments/PayBillForm'
import PaymentCard from '@/components/payments/PaymentCard'
import PaymentForm from '@/components/payments/PaymentForm'
import { PAYMENT_STATUSES } from '@/constants/payments'
import { useStore } from '@/hooks/useStore'
import { removeItem } from '@/store/actions'
import { todayIso } from '@/utils/date'
import { amountOwed, paymentStatus } from '@/utils/finance'
import { formatMoney } from '@/utils/format'

export default function PaymentsPage() {
    const { state, dispatch } = useStore()
    const [editing, setEditing] = useState(null)
    const [paying, setPaying] = useState(null)
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')
    const [dueFrom, setDueFrom] = useState('')
    const [dueTo, setDueTo] = useState('')

    const bills = state.payments
        .filter(
            (bill) =>
                bill.name.toLowerCase().includes(search.toLowerCase()) &&
                (!status || paymentStatus(bill) === status) &&
                (!dueFrom || bill.due >= dueFrom) &&
                (!dueTo || bill.due <= dueTo),
        )
        .sort((a, b) => a.due.localeCompare(b.due))

    const unpaid = state.payments.filter((bill) => amountOwed(bill) > 0)
    const outstanding = unpaid.reduce((total, bill) => total + amountOwed(bill), 0)
    const summaries = [
        { label: 'Upcoming payments', value: unpaid.filter((bill) => bill.due >= todayIso()).length },
        {
            label: 'Paid bills',
            value: state.payments.filter((bill) => paymentStatus(bill) === 'Paid').length,
        },
        { label: 'Outstanding balance', value: `PHP ${formatMoney(outstanding)}` },
    ]

    return (
        <>
            <div className="grid three">
                {summaries.map((summary) => (
                    <section className="card" key={summary.label}>
                        <small className="lbl">{summary.label}</small>
                        <p className="big-num">{summary.value}</p>
                    </section>
                ))}
            </div>

            <div className="between wrap">
                <div className="filters">
                    <input
                        type="search"
                        placeholder="Search payments"
                        aria-label="Search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <select
                        aria-label="Status"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                    >
                        <option value="">All statuses</option>
                        {PAYMENT_STATUSES.map((option) => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                    <input
                        type="date"
                        aria-label="Due from"
                        value={dueFrom}
                        onChange={(event) => setDueFrom(event.target.value)}
                    />
                    <input
                        type="date"
                        aria-label="Due to"
                        value={dueTo}
                        onChange={(event) => setDueTo(event.target.value)}
                    />
                </div>
                <button className="btn" onClick={() => setEditing({})} disabled={!state.accounts.length}>
                    Add payment
                </button>
            </div>

            {!bills.length && <p className="muted">No payments found.</p>}
            {bills.map((bill) => (
                <PaymentCard
                    key={bill.id}
                    payment={bill}
                    onPay={() => setPaying(bill)}
                    onEdit={() => setEditing(bill)}
                    onDelete={() =>
                        confirm('Delete this payment?') && dispatch(removeItem('payments', bill.id))
                    }
                />
            ))}

            {editing && (
                <PaymentForm payment={editing.id ? editing : null} onClose={() => setEditing(null)} />
            )}
            {paying && <PayBillForm bill={paying} onClose={() => setPaying(null)} />}
        </>
    )
}