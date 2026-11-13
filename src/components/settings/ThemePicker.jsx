import { THEMES } from '@/theme/themes'
import { contrastWithWhite } from '@/utils/color'

const COLOR_FIELDS = [
    { key: 'primary', label: 'Main color', hint: 'Buttons, headings, sidebar' },
    { key: 'secondary', label: 'Accent color', hint: 'Labels, active tabs, tags' },
    { key: 'light', label: 'Soft color', hint: 'Light tints and highlights' },
]

function Swatches({ colors }) {
    return (
        <span className="tsw">
            {colors.map((color, index) => (
                <i key={index} style={{ background: color }} />
            ))}
        </span>
    )
}

export default function ThemePicker({ settings, onChange }) {
    const activeId = settings.theme || 'sakura'
    const preset = THEMES.find((theme) => theme.id === activeId) ?? THEMES[0]
    const colors =
        activeId === 'custom' && settings.custom
            ? settings.custom
            : {
                primary: preset.vars['--primary'],
                secondary: preset.vars['--secondary'],
                light: preset.vars['--primary-light'],
            }

    return (
        <section className="card">
            <h2>Color theme</h2>
            <p className="muted">
                Pick a ready-made look, or choose your own three colors. It applies right away.
            </p>
            <div className="themes">
                {THEMES.map((theme) => (
                    <button
                        key={theme.id}
                        className={`themebtn${activeId === theme.id ? ' on' : ''}`}
                        aria-pressed={activeId === theme.id}
                        onClick={() => onChange({ theme: theme.id })}
                    >
                        <Swatches
                            colors={[
                                theme.vars['--primary'],
                                theme.vars['--secondary'],
                                theme.vars['--primary-light'],
                            ]}
                        />
                        {theme.name}
                    </button>
                ))}
                <button
                    className={`themebtn${activeId === 'custom' ? ' on' : ''}`}
                    aria-pressed={activeId === 'custom'}
                    onClick={() => onChange({ theme: 'custom', custom: colors })}
                >
                    <Swatches colors={[colors.primary, colors.secondary, colors.light]} />
                    Custom
                </button>
            </div>
            <h3 className="sub">Your colors</h3>
            <div className="picks">
                {COLOR_FIELDS.map(({ key, label, hint }) => (
                    <label className="pick" key={key}>
                        <input
                            type="color"
                            value={colors[key]}
                            aria-label={label}
                            onChange={(event) =>
                                onChange({ theme: 'custom', custom: { ...colors, [key]: event.target.value } })
                            }
                        />
                        <span>
                            <b>{label}</b>
                            <small>{hint}</small>
                        </span>
                    </label>
                ))}
            </div>
            {contrastWithWhite(colors.primary) < 3 && (
                <p className="err" role="status">
                    Your main color is quite light, so white text on buttons may be hard to read.
                </p>
            )}
        </section>
    )
}