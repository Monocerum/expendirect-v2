import { TRACKER_PERIODS } from '@/constants/periods'

export default function PeriodTabs({ value, onChange }) {
    return (
        <div className="periods" role="tablist" aria-label="Period">
            {TRACKER_PERIODS.map((period) => (
                <button
                    key={period}
                    role="tab"
                    aria-selected={value === period}
                    className={value === period ? 'on' : ''}
                    onClick={() => onChange(period)}
                >
                    {period}
                </button>
            ))}
        </div>
    )
}