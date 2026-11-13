import FormRow from '@/components/common/FormRow'
import ResetDataSection from '@/components/settings/ResetDataSection'
import ThemePicker from '@/components/settings/ThemePicker'
import { useStore } from '@/hooks/useStore'
import { mergeInto } from '@/store/actions'

export default function SettingsPage() {
    const { state, dispatch } = useStore()
    const updateSettings = (values) => dispatch(mergeInto('settings', values))

    return (
        <>
            <ThemePicker settings={state.settings} onChange={updateSettings} />
            <section className="card form">
                <h2>Preferences</h2>
                <FormRow label="Monthly savings goal (PHP)">
                    <input
                        type="number"
                        min="0"
                        value={state.settings.goal}
                        onChange={(event) => updateSettings({ goal: event.target.value })}
                    />
                </FormRow>
            </section>
            <ResetDataSection />
        </>
    )
}