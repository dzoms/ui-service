import { faCamera, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './historyCall.css'
import avatar from '/image/logo.png'

export default function historyCall() {
  return (
    <div class='history-call'>
      <img src={avatar} />
      <span>Фамилия Имя Отчество</span>
      <FontAwesomeIcon icon={faPhone} />
      <FontAwesomeIcon icon={faCamera} />
    </div>
  )
}
