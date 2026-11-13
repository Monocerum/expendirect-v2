export default function AccountIcon({ account }) {
    if (account?.icon) {
        return <img className="aic" src={account.icon} alt={`${account.name} account icon`} />
    }
    return <span className="aic ph">{account?.name?.[0] || '?'}</span>
}