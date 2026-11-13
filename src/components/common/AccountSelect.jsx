import { useState } from 'react'
import { useStore } from '@/hooks/useStore'
import AccountIcon from './AccountIcon'

export default function AccountSelect({ value, onChange }) {
    const { state } = useStore()
    const [isOpen, setIsOpen] = useState(false)
    const selected = state.accounts.find((account) => account.id === value)

    const choose = (accountId) => {
        onChange(accountId)
        setIsOpen(false)
    }

    return (
        <div className="dd">
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            >
                <AccountIcon account={selected} />
                {selected?.name || 'Select account'} ▾
            </button>
            {isOpen && (
                <ul role="listbox">
                    {state.accounts.map((account) => (
                        <li key={account.id}>
                            <button type="button" onClick={() => choose(account.id)}>
                                <AccountIcon account={account} />
                                {account.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}