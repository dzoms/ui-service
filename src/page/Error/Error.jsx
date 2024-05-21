import PageNotFound from '../../components/pageNotFound/pageNotFound'
import Header from './../../components/Header/Header'
import './Error.css'
import pageOps from '/image/error.png'

export default function Error() {
  return (
    <div class='error'>
      <Header />
      <img src={pageOps} />
      <PageNotFound />
    </div>
  )
}
