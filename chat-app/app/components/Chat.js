'use client'
import { useState } from 'react';
import Message from './Message';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    const message = {
      id: Date.now(),
      sender: 'doctor', // or 'patient'
      text: newMessage,
      timestamp: new Date(),
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div>
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
      <input
        className="text-black"
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Chat;
