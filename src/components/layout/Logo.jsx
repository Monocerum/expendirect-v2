import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="logo">
      <img src="/assets/teacup.svg" alt="Expendirect pink teacup logo" width="44" height="44" />
      <span>
        <b>expendirect</b>
        <small>expense tracker</small>
      </span>
      <img className="fl" src="/assets/logo-flower.png" alt="" />
    </Link>
  )
}