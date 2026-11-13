export default function FormRow({ label, children }) {
    return (
        <label className="row">
            <span>{label}</span>
            {children}
        </label>
    )
}