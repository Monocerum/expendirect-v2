import Modal from '@/components/common/Modal'
import { useStore } from '@/hooks/useStore'
import { accountBalance, sumAmounts } from '@/utils/finance'
import { formatMoney } from '@/utils/format'

export default function AccountSummaryModal({ account, onClose }) {
    const { state } = useStore()
    const transactions = state.transactions.filter((item) => item.accountId === account.id)
    const income = transactions.filter((item) => item.type === 'income')
    const expenses = transactions.filter((item) => item.type === 'expense')

    return (
        <Modal title={account.name} onClose={onClose}>
            <dl className="dl">
                <dt>Opening balance</dt>
                <dd>PHP {formatMoney(account.opening)}</dd>
                <dt>Total income</dt>
                <dd>PHP {formatMoney(sumAmounts(income))}</dd>
                <dt>Total expenses</dt>
                <dd>PHP {formatMoney(sumAmounts(expenses))}</dd>
                <dt>Entries</dt>
                <dd>{transactions.length}</dd>
                <dt>Balance</dt>
                <dd>PHP {formatMoney(accountBalance(state, account.id))}</dd>
            </dl>
        </Modal>
    )
}