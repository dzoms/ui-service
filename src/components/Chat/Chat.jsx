import React, { useState } from 'react';
import { usePubSub } from "@videosdk.live/react-sdk";

function Chat() {
  const { publish, messages } = usePubSub("CHAT", {
    onMessageReceived: (message) => {
      // Логирование для отладки структуры получаемых сообщений
      console.log("Received message:", message);
    }
  });

  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Отправляем сообщение как объект с ключом 'message'
      publish({ message: message.trim() }, { persist: true });
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => {
          // Извлекаем текст сообщения для отображения
          const messageText = typeof msg.message === 'object' ? msg.message.message : msg.message;
          return (
            <p key={index}><b>{msg.senderName}:</b> {messageText}</p>
          );
        })}
      </div>
      <div className="input-area">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
