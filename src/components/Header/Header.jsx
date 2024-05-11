import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Header.css'
import logo from '/image/logo.png'

export default function Header() {
  return (
    <header>
      <div class='left'>
        <img src={logo} />
        <div class='name-logo'>Dzoms</div>
      </div>
      <div class='right'>
        <FontAwesomeIcon icon={faBell} />
        <div class='user-photo'></div>
      </div>
    </header>
  )
}
