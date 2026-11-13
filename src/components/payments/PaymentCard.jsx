import { useStore } from '@/hooks/useStore'
import { todayIso } from '@/utils/date'
import { amountOwed, amountPaid, paymentStatus } from '@/utils/finance'
import { formatMoney } from '@/utils/format'
import StatusPill from './StatusPill'

export default function PaymentCard({ payment, onPay, onEdit, onDelete }) {
    const { state } = useStore()
    const balance = amountOwed(payment)
    const isOverdue = balance > 0 && payment.due < todayIso()
    const accountName = state.accounts.find((account) => account.id === payment.accountId)?.name

    const paymentsMade = state.transactions
        .filter((item) => item.billId && item.billId === payment.id)
        .sort((a, b) => b.date.localeCompare(a.date))
    const creditsReceived = state.transactions.filter(
        (item) => item.nextId === payment.id && item.credited > 0,
    )
    const historyCount = paymentsMade.length + creditsReceived.length

    return (
        <section className="card pay">
            <StatusPill status={paymentStatus(payment)} />
            <div>
                <b>{payment.name}</b>
                <small>
                    {accountName} · due {payment.due}
                    {payment.recurring && ` · ${payment.frequency}`}
                    {isOverdue && <em className="late"> · overdue</em>}
                </small>
            </div>
            <div>
                PHP {formatMoney(payment.amount)}
                <small>
                    {amountPaid(payment) > 0 && `Paid PHP ${formatMoney(amountPaid(payment))} · `}
                    Balance PHP {formatMoney(balance)}
                </small>
            </div>
            <div className="actions row-actions">
                {balance > 0 && (
                    <button className="link" onClick={onPay}>
                        Pay
                    </button>
                )}
                <button className="link" onClick={onEdit}>
                    Edit
                </button>
                <button className="link" onClick={onDelete}>
                    Delete
                </button>
            </div>
            {historyCount > 0 && (
                <details className="hist">
                    <summary>Payments made ({historyCount})</summary>
                    <ul>
                        {creditsReceived.map((item) => (
                            <li className="credit" key={`credit-${item.id}`}>
                                <span>{item.date}</span>
                                <span>
                                    Excess carried over from{' '}
                                    {state.payments.find((bill) => bill.id === item.billId)?.name || 'previous bill'}
                                </span>
                                <b>PHP {formatMoney(item.credited)}</b>
                            </li>
                        ))}
                        {paymentsMade.map((item) => (
                            <li key={item.id}>
                                <span>{item.date}</span>
                                <span>{item.description}</span>
                                <b>PHP {formatMoney(item.amount)}</b>
                            </li>
                        ))}
                    </ul>
                </details>
            )}
        </section>
    )
}