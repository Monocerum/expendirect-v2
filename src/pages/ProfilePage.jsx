import { useState } from 'react'
import FormRow from '@/components/common/FormRow'
import { useStore } from '@/hooks/useStore'
import { mergeInto } from '@/store/actions'
import { readFileAsDataUrl } from '@/utils/files'

export default function ProfilePage() {
    const { state, dispatch } = useStore()
    const [form, setForm] = useState(state.profile)
    const [isSaved, setIsSaved] = useState(false)

    const updateForm = (changes) => {
        setForm((current) => ({ ...current, ...changes }))
        setIsSaved(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(mergeInto('profile', form))
        setIsSaved(true)
    }

    return (
        <form className="card form" onSubmit={handleSubmit}>
            <h2>Your profile</h2>
            {form.avatar && <img className="pfp" src={form.avatar} alt="Your profile photo" />}
            <FormRow label="Photo">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        const [file] = event.target.files
                        if (file) readFileAsDataUrl(file, (avatar) => updateForm({ avatar }))
                    }}
                />
            </FormRow>
            <FormRow label="Name">
                <input value={form.name} onChange={(event) => updateForm({ name: event.target.value })} />
            </FormRow>
            <FormRow label="Email">
                <input
                    type="email"
                    value={form.email}
                    onChange={(event) => updateForm({ email: event.target.value })}
                />
            </FormRow>
            <button className="btn">Save profile</button>
            {isSaved && (
                <p className="muted" role="status">
                    Profile saved.
                </p>
            )}
        </form>
    )
}