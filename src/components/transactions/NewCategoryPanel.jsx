import ColorSwatchPicker from '@/components/common/ColorSwatchPicker'
import { onEnterKey } from '@/utils/events'

export default function NewCategoryPanel({ draft, onChange, onSave, onCancel }) {
  return (
    <div className="minipanel">
      <input
        autoFocus
        placeholder="Category name"
        aria-label="New category name"
        value={draft.name}
        onChange={(event) => onChange({ ...draft, name: event.target.value })}
        onKeyDown={onEnterKey(onSave)}
      />
      <ColorSwatchPicker value={draft.color} onChange={(color) => onChange({ ...draft, color })} />
      <div className="btns">
        <button type="button" className="btn sm" onClick={onSave}>
          Save category
        </button>
        <button type="button" className="link" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}