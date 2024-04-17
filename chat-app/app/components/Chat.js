// components/Chat.js
'use client'
// components/Chat.js
import { useState } from 'react';
import Message from './Message';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sender, setSender] = useState('doctor'); // New state for sender

  const handleSend = () => {
    const message = {
      id: Date.now(),
      sender: sender, // Use the sender state here
      text: newMessage,
      timestamp: new Date(),
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const toggleSender = () => { // New function to toggle sender
    setSender(sender === 'doctor' ? 'patient' : 'doctor');
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
      <button onClick={toggleSender}>Switch to {sender === 'doctor' ? 'patient' : 'doctor'}</button> {/* New button to switch sender */}
    </div>
  );
}

export default Chat;
