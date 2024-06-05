<<<<<<< HEAD
=======
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
>>>>>>> 6a43db5ac4abff2c3e93161954d8615bb3bfbbd7
import { usePubSub } from '@videosdk.live/react-sdk'
import React, { useState } from 'react'
import './Chat.css'

function Chat() {
  const { publish, messages } = usePubSub('CHAT', {
    onMessageReceived: (message) => {
      console.log('Received message:', message)
    },
  })

  const [message, setMessage] = useState('')
<<<<<<< HEAD


  const handleSendMessage = () => {
    if (message.trim()) {
      // Отправляем сообщение как объект с ключом 'message'

=======

  const handleSendMessage = () => {
    if (message.trim()) {
>>>>>>> 6a43db5ac4abff2c3e93161954d8615bb3bfbbd7
      publish({ message: message.trim() }, { persist: true })
      setMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
  }
  return (
    <div className='chat-container'>
      <div className='messages'>
        {messages.map((msg, index) => {
          const messageText = typeof msg.message === 'object' ? msg.message.message : msg.message
          const timestamp = msg.timestamp ? formatTimestamp(msg.timestamp) : ''

          return (
            <p key={index} className='message'>
              <b>{msg.senderName}:</b> {messageText}
              <span className='timestamp'>{timestamp}</span>
            </p>
          )
        })}
      </div>
      <div className='input-area'>
        <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder='Введите сообщение...' />
        <button onClick={handleSendMessage}>
          <FontAwesomeIcon icon={faShare} />
        </button>
      </div>
    </div>
  )
}

export default Chat
