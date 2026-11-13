export default function DatePickLink({ label, value, onChange, min }) {
    return (
        <label className="link datepick">
            {label}
            <input
                type="date"
                min={min}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                onClick={(event) => event.target.showPicker?.()}
            />
        </label>
    )
}