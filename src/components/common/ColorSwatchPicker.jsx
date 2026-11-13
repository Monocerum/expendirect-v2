import { CATEGORY_SWATCHES } from '@/constants/categories'

export default function ColorSwatchPicker({ value, onChange }) {
  const isCustomColor = !CATEGORY_SWATCHES.includes(value)

  return (
    <div className="swatches">
      {CATEGORY_SWATCHES.map((color) => (
        <button
          type="button"
          key={color}
          aria-label={color}
          className={`sw${value === color ? ' on' : ''}`}
          style={{ background: color }}
          onClick={() => onChange(color)}
        />
      ))}
      <label
        className="sw picker"
        title="Custom color"
        style={{ borderColor: isCustomColor ? value : undefined }}
      >
        <img src="/assets/eyedropper.svg" alt="" width="16" height="16" />
        <input
          type="color"
          aria-label="Custom color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    </div>
  )
}