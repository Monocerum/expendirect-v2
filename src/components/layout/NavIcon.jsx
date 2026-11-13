export default function NavIcon({ name, size = 24 }) {
  const iconFile = name.includes('.') ? name : `${name}.svg`

  return (
    <img
      className="ico"
      src={`/assets/${iconFile}`}
      alt=""
      width={size}
      height={size}
    />
  )
}