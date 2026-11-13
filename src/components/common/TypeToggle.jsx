import { TRANSACTION_TYPES } from '@/constants/transactions'

export default function TypeToggle({
    value,
    onChange,
    options = TRANSACTION_TYPES,
    align = 'left',
}) {
    return (
        <div className={align === 'left' ? 'toggle left' : 'toggle'}>
            {options.map((option) => (
                <button
                    type="button"
                    key={option.value}
                    className={value === option.value ? 'on' : ''}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}