import { Link } from 'react-router-dom'
import DateFilter from '@/components/common/DateFilter'
import { dateFilterLabel } from '@/utils/date'
import { formatMoney } from '@/utils/format'

export default function TotalCard({
  area,
  label,
  filter,
  onFilterChange,
  amount,
  linkTo,
  linkLabel,
}) {
  return (
    <section className={`card ${area}`}>
      <small className="lbl">{label}</small>
      <h2>{dateFilterLabel(filter)}</h2>
      <DateFilter value={filter} onChange={onFilterChange} />
      <p className="big-num">
        <sup>PHP</sup> {formatMoney(amount)}
      </p>
      <Link className="btn cta" to={linkTo}>
        {linkLabel}
      </Link>
    </section>
  )
}