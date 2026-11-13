import { useState } from 'react'
import { useStore } from '@/hooks/useStore'
import { removeItem } from '@/store/actions'
import { formatMoney } from '@/utils/format'
import TransactionForm from './TransactionForm'

function excessBadgeText(transaction) {
    return transaction.credited > 0
        ? `Excess PHP ${formatMoney(transaction.credited)} → next payment`
        : `Overpaid PHP ${formatMoney(transaction.excess)}`
}

export default function TransactionEntry({ transaction, color, name }) {
    const { state, dispatch } = useStore()
    const [isEditing, setIsEditing] = useState(false)
    const accountName = state.accounts.find((account) => account.id === transaction.accountId)?.name
    const bill = transaction.billId
        ? state.payments.find((payment) => payment.id === transaction.billId)
        : undefined

    const handleDelete = () => {
        if (confirm('Delete this entry?')) dispatch(removeItem('transactions', transaction.id))
    }

    return (
        <article className="entry">
            <i style={{ background: color }} />
            <div className="ename">
                <b>{name}</b>
                <small>{accountName}</small>
            </div>
            <span className="eamt">
                <sup>PHP</sup> {formatMoney(transaction.amount)}
            </span>
            <div className="emeta">
                {transaction.description && <p className="desc">{transaction.description}</p>}
                {transaction.plan && <span className="plan-badge">{transaction.plan}</span>}
                {bill && <span className="bill-badge">Bill · {bill.name}</span>}
                {transaction.billId && transaction.excess > 0 && (
                    <span className="bill-badge">{excessBadgeText(transaction)}</span>
                )}
                {!!transaction.tags?.length && (
                    <div className="tags">
                        {transaction.tags.map((tag) => (
                            <span className="tag" key={tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                {transaction.notes && (
                    <p className="note">
                        <small>Note:</small>
                        {transaction.notes}
                    </p>
                )}
                <div className="entry-actions">
                    <button className="link" onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                    <button className="link" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
            {isEditing && (
                <TransactionForm transaction={transaction} onClose={() => setIsEditing(false)} />
            )}
        </article>
    )
}