import TransactionEntry from '@/components/transactions/TransactionEntry'

export default function CategoryGroupCard({ group, heading }) {
    return (
        <section className="card">
            <small className="lbl">{heading}</small>
            <h2>{group.name}</h2>
            {group.items.map((item) => (
                <TransactionEntry key={item.id} transaction={item} color={group.color} name={group.name} />
            ))}
        </section>
    )
}