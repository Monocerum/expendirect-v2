import { useState } from 'react'
import { ALL_ACCOUNTS } from '@/constants/accounts'
import { useStore } from '@/hooks/useStore'
import AccountIcon from './AccountIcon'

export default function AccountSelect({ value, onChange, includeAll = false }) {
    const { state } = useStore()
    const [isOpen, setIsOpen] = useState(false)
    const selected = value === ALL_ACCOUNTS.id ? ALL_ACCOUNTS : state.accounts.find((account) => account.id === value)

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
                    {includeAll && (
                        <li>
                            <button type="button" onClick={() => choose(ALL_ACCOUNTS.id)}>
                                <AccountIcon account={ALL_ACCOUNTS} />
                                {ALL_ACCOUNTS.name}
                            </button>
                        </li>
                    )}
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