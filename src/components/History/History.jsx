import HistoryCall from './../../components/historyCall/historyCall'
import './History.css'

export default function History() {
  return (
    <div class='history'>
      <span>история звонков</span>
      <HistoryCall />
      <HistoryCall />
      <HistoryCall />
      <HistoryCall />
      <HistoryCall />
    </div>
  )
}
