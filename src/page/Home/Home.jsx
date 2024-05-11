import Header from './../../components/Header/Header'
import History from './../../components/History/History'
import CreateCall from './../../components/createCall/createCall'
import JoinCall from './../../components/joinCall/joinCall'
import './Home.css'
import wave from '/image/wave.png'

export default function Home() {
  return (
    <div class='home'>
      <Header />
      <div class='blocks'>
        <div class='calls'>
          <CreateCall />
          <JoinCall />
        </div>
        <History />
        <img src={wave} />
      </div>
    </div>
  )
}
