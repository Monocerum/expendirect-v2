import { useState } from 'react'
import FormRow from '@/components/common/FormRow'
import Modal from '@/components/common/Modal'
import { BILL_SUGGESTIONS, PAYMENT_FREQUENCIES } from '@/constants/payments'
import { useStore } from '@/hooks/useStore'
import { addItem, updateItem } from '@/store/actions'
import { todayIso } from '@/utils/date'
import { amountPaid } from '@/utils/finance'

export default function PaymentForm({ payment, onClose }) {
    const { state, dispatch } = useStore()
    const [form, setForm] = useState(() =>
        payment
            ? { ...payment, paid: amountPaid(payment) }
            : {
                name: '',
                amount: '',
                paid: '',
                accountId: state.accounts[0]?.id || '',
                due: todayIso(),
                recurring: false,
                frequency: 'monthly',
                customDays: 30,
            },
    )
    const updateField = (field) => (event) => setForm({ ...form, [field]: event.target.value })

    const handleSubmit = (event) => {
        event.preventDefault()
        const amount = Number(form.amount)
        const values = { ...form, amount, paid: Math.min(Number(form.paid) || 0, amount) }
        dispatch(payment ? updateItem('payments', values) : addItem('payments', values))
        onClose()
    }

    return (
        <Modal title={payment ? 'Edit payment' : 'Add payment'} onClose={onClose}>
            <form className="form" onSubmit={handleSubmit}>
                <FormRow label="Bill name or type">
                    <input
                        required
                        list="bill-suggestions"
                        value={form.name}
                        onChange={updateField('name')}
                    />
                </FormRow>
                <datalist id="bill-suggestions">
                    {BILL_SUGGESTIONS.map((name) => (
                        <option key={name}>{name}</option>
                    ))}
                </datalist>
                <FormRow label="Amount">
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        value={form.amount}
                        onChange={updateField('amount')}
                    />
                </FormRow>
                <FormRow label="Already paid">
                    <input
                        type="number"
                        min="0"
                        max={form.amount || undefined}
                        step="0.01"
                        placeholder="0"
                        value={form.paid}
                        onChange={updateField('paid')}
                    />
                </FormRow>
                <FormRow label="Account">
                    <select required value={form.accountId} onChange={updateField('accountId')}>
                        {state.accounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                </FormRow>
                <FormRow label="Due date">
                    <input type="date" required value={form.due} onChange={updateField('due')} />
                </FormRow>
                <FormRow label="Recurring">
                    <input
                        type="checkbox"
                        checked={form.recurring}
                        onChange={(event) => setForm({ ...form, recurring: event.target.checked })}
                    />
                </FormRow>
                {form.recurring && (
                    <FormRow label="Frequency">
                        <select value={form.frequency} onChange={updateField('frequency')}>
                            {PAYMENT_FREQUENCIES.map((frequency) => (
                                <option key={frequency}>{frequency}</option>
                            ))}
                        </select>
                    </FormRow>
                )}
                {form.recurring && form.frequency === 'custom' && (
                    <FormRow label="Every (days)">
                        <input
                            type="number"
                            min="1"
                            value={form.customDays}
                            onChange={updateField('customDays')}
                        />
                    </FormRow>
                )}
                <button className="btn">Save payment</button>
            </form>
        </Modal>
    )
}