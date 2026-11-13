import { MONTHS, getYearOptions } from '@/utils/date'

export default function DateFilter({ value, onChange }) {
    const update = (field) => (event) => onChange({ ...value, [field]: event.target.value })

    return (
        <div className="filters">
            <select
                aria-label="Month"
                value={value.month}
                disabled={value.overall}
                onChange={update('month')}
            >
                <option value="">Month</option>
                {MONTHS.map((name, index) => (
                    <option key={name} value={index + 1}>
                        {name}
                    </option>
                ))}
            </select>
            <select
                aria-label="Year"
                value={value.year}
                disabled={value.overall}
                onChange={update('year')}
            >
                <option value="">Year</option>
                {getYearOptions().map((year) => (
                    <option key={year}>{year}</option>
                ))}
            </select>
            <label className="chk">
                <input
                    type="checkbox"
                    checked={value.overall}
                    onChange={(event) => onChange({ ...value, overall: event.target.checked })}
                />
                Overall
            </label>
        </div>
    )
}
