import FormRow from '@/components/common/FormRow'
import TypeToggle from '@/components/common/TypeToggle'
import ResetDataSection from '@/components/settings/ResetDataSection'
import ThemePicker from '@/components/settings/ThemePicker'
import { useStore } from '@/hooks/useStore'
import { mergeInto } from '@/store/actions'
import { savingsPercent } from '@/utils/budgetPlan'

const GOAL_SOURCES = [
    { value: 'fixed', label: 'Fixed amount' },
    { value: 'plan', label: 'From budget plan' },
]

export default function SettingsPage() {
    const { state, dispatch } = useStore()
    const updateSettings = (values) => dispatch(mergeInto('settings', values))
    const goalSource = state.settings.goalSource || 'fixed'
    const hasSavingsPlan = state.plans.some((plan) => savingsPercent(plan) > 0)

    return (
        <>
            <ThemePicker settings={state.settings} onChange={updateSettings} />
            <section className="card form">
                <h2>Preferences</h2>
                <div className="row start">
                    <span>Savings goal</span>
                    <TypeToggle
                        value={goalSource}
                        options={GOAL_SOURCES}
                        onChange={(value) => updateSettings({ goalSource: value })}
                    />
                </div>
                {goalSource === 'plan' && (
                    <p className="muted">
                        {hasSavingsPlan
                            ? 'Your goal is each plan’s savings % of that account’s income, so it follows your budget plans. The fixed amount below is only used if no plan sets aside savings.'
                            : 'No budget plan sets aside savings yet, so the fixed amount below is used. Add a Savings item on the Budget Plan page.'}
                    </p>
                )}
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