export default function SearchInput({ value, onChange, placeholder, label = placeholder }) {
    return (
        <input
            className="search"
            type="search"
            placeholder={placeholder}
            aria-label={label}
            value={value}
            onChange={(event) => onChange(event.target.value)}
        />
    )
}