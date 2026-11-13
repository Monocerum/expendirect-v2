import { useState } from 'react'
import AccountCard from '@/components/accounts/AccountCard'
import AccountForm from '@/components/accounts/AccountForm'
import AccountSummaryModal from '@/components/accounts/AccountSummaryModal'
import SearchInput from '@/components/common/SearchInput'
import TransactionForm from '@/components/transactions/TransactionForm'
import { useStore } from '@/hooks/useStore'
import { removeItem } from '@/store/actions'
import { accountBalance } from '@/utils/finance'

export default function AccountsPage() {
    const { state, dispatch } = useStore()
    const [search, setSearch] = useState('')
    const [editing, setEditing] = useState(null)
    const [entryDraft, setEntryDraft] = useState(null)
    const [viewing, setViewing] = useState(null)

    const accounts = state.accounts.filter((account) =>
        account.name.toLowerCase().includes(search.toLowerCase()),
    )

    const handleDelete = (account) => {
        if (confirm(`Delete ${account.name} and all its entries?`)) {
            dispatch(removeItem('accounts', account.id))
        }
    }

    return (
        <>
            <div className="between">
                <SearchInput value={search} onChange={setSearch} placeholder="Search accounts" />
                <button className="btn" onClick={() => setEditing({})}>
                    Add account
                </button>
            </div>
            {!accounts.length && (
                <p className="muted">No accounts found. Add a bank or a budget like “Travel fund”.</p>
            )}
            {accounts.map((account) => (
                <AccountCard
                    key={account.id}
                    account={account}
                    balance={accountBalance(state, account.id)}
                    onAddEntry={(type) => setEntryDraft({ type, accountId: account.id })}
                    onView={() => setViewing(account)}
                    onEdit={() => setEditing(account)}
                    onDelete={() => handleDelete(account)}
                />
            ))}
            {editing && (
                <AccountForm account={editing.id ? editing : null} onClose={() => setEditing(null)} />
            )}
            {entryDraft && (
                <TransactionForm
                    type={entryDraft.type}
                    accountId={entryDraft.accountId}
                    onClose={() => setEntryDraft(null)}
                />
            )}
            {viewing && <AccountSummaryModal account={viewing} onClose={() => setViewing(null)} />}
        </>
    )
}