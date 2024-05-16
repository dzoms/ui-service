import Header from './../../components/Header/Header'
import History from './../../components/History/History'
import CreateCall from './../../components/createCall/createCall'
import JoinCall from './../../components/joinCall/joinCall'
import './Home.css'
import { handleLogError } from './../../components/misc/Helpers'
import wave from '/image/wave.png'
import React, { useState, useEffect  } from 'react';


export default function Home() {
  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      try {
        //const response = await moviesApi.getMovies()
        //const movies = response.data
      } catch (error) {
        handleLogError(error)
      } finally {
        setIsLoading(false)
      }
    }
    //fetchMovies()
  }, [])

  return (
    isLoading ? <></> : <div class='home'>
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
