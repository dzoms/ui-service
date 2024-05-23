import { usePubSub } from '@videosdk.live/react-sdk'
import React, { useState } from 'react'
import './Chat.css' // Импортируйте стили

function Chat() {
  const { publish, messages } = usePubSub('CHAT', {
    onMessageReceived: (message) => {
      // Логирование для отладки структуры получаемых сообщений
      console.log('Received message:', message)
    },
  })

  const [message, setMessage] = useState('')


  const handleSendMessage = () => {
    if (message.trim()) {
      // Отправляем сообщение как объект с ключом 'message'

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
        <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder='Type a message...' />
        <button onClick={handleSendMessage}>Отправить</button>
      </div>
    </div>
  )
}

export default Chat
