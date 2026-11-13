export const onEnterKey = (handler) => (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        handler()
    }
}