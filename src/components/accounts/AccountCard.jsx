import { Link } from 'react-router-dom'
import AccountIcon from '@/components/common/AccountIcon'
import { TRANSACTION_TYPES } from '@/constants/transactions'
import { formatMoney } from '@/utils/format'

export default function AccountCard({ account, balance, onAddEntry, onView, onEdit, onDelete }) {
    return (
        <section className="card acct">
            <div>
                <small className="lbl">Account name</small>
                <h2>
                    <AccountIcon account={account} /> {account.name}
                </h2>
                {TRANSACTION_TYPES.map(({ value, label }) => (
                    <div className="btnrow" key={value}>
                        <Link className="btn wide" to={`/tracker?account=${account.id}&type=${value}`}>
                            {label}
                        </Link>
                        <button
                            className="btn sq"
                            aria-label={`Add ${value}`}
                            onClick={() => onAddEntry(value)}
                        >
                            +
                        </button>
                        <Link
                            className="btn sq"
                            aria-label={`Remove ${value} entries`}
                            to={`/tracker?account=${account.id}&type=${value}`}
                        >
                            −
                        </Link>
                    </div>
                ))}
            </div>
            <p className="bal">
                <small>Balance</small> <sup>PHP</sup> {formatMoney(balance)}
            </p>
            <div className="actions">
                <button className="link" onClick={onView}>
                    View
                </button>
                <button className="link" onClick={onEdit}>
                    Edit
                </button>
                <button className="link" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </section>
    )
}