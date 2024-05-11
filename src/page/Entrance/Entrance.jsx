import Entry from './../../components/Entry/Entry'
//import Register from './../../components/Register/Register'
import './Entrance.css'
import logo from '/image/logo.png'
import wave from '/image/wave.png'

export default function Entrance() {
  return (
    <div class='entrance'>
      <div class='left'>
        <img src={logo} />
        <span>Dzoms</span>
      </div>
      <Entry />
      <img src={wave} />
    </div>
  )
}
