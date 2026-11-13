export default function StatusPill({ status }) {
  return (
    <span className={`pill ${status.split(' ')[0].toLowerCase()}`}>
      {status}
    </span>
  )
}