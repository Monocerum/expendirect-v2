import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import StatusPill from '@/components/payments/StatusPill'
import { MONTHS } from '@/utils/date'
import { amountOwed, paymentStatus } from '@/utils/finance'
import { formatMoney } from '@/utils/format'

const COLUMNS = ['Status', 'Bill', 'Cost', 'Balance', 'Due']

export default function BillsCard({ area, bills, month, year }) {
    return (
        <section className={`card ${area}`}>
            <small className="lbl">Bills</small>
            <h2>
                {MONTHS[month]} {year}
            </h2>
            {bills.length ? (
                <div className="table" role="table">
                    {COLUMNS.map((column) => (
                        <b key={column} role="columnheader">
                            {column}
                        </b>
                    ))}
                    {bills.map((bill) => (
                        <Fragment key={bill.id}>
                            <StatusPill status={paymentStatus(bill)} />
                            <span>{bill.name}</span>
                            <span>PHP {formatMoney(bill.amount)}</span>
                            <span>PHP {formatMoney(amountOwed(bill))}</span>
                            <span>{bill.due}</span>
                        </Fragment>
                    ))}
                </div>
            ) : (
                <p className="muted">No bills due this month.</p>
            )}
            <Link className="link" to="/payments">
                Update information
            </Link>
        </section>
    )
}