import { formatMoney } from '@/utils/format'

export default function ExcessNotice({
    excess,
    balance,
    billName,
    isRecurring,
    useExcess,
    onChange,
}) {
    return (
        <div className="excess" role="alert">
            <p>
                <b>Excess payment.</b> This is PHP {formatMoney(excess)} more than the remaining balance of
                PHP {formatMoney(balance)}
                {billName ? ` for ${billName}` : ''}.
            </p>
            {isRecurring ? (
                <>
                    <p>Use the excess for the next payment?</p>
                    <div className="chips">
                        <button
                            type="button"
                            className={`chip${useExcess === true ? ' on' : ''}`}
                            aria-pressed={useExcess === true}
                            onClick={() => onChange(true)}
                        >
                            Yes, apply it to the next payment
                        </button>
                        <button
                            type="button"
                            className={`chip${useExcess === false ? ' on' : ''}`}
                            aria-pressed={useExcess === false}
                            onClick={() => onChange(false)}
                        >
                            No, keep it as an overpayment
                        </button>
                    </div>
                </>
            ) : (
                <p className="muted">
                    This bill isn’t recurring, so there is no next payment to credit. Turn on “Recurring” for
                    it in Payments to carry excess forward.
                </p>
            )}
        </div>
    )
}