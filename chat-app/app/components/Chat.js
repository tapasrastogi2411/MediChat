// components/Chat.js
'use client'
import { useState, useEffect, useRef } from 'react';
import Message from './Message';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sender, setSender] = useState('doctor'); // New state for sender
  const messagesEndRef = useRef(null); // New ref for the last message

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="overflow-auto">
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} /> {/* New div for the ref */}
      </div>
      <div className="flex items-center p-4 bg-white border-t border-gray-200">
        <input
          className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <button 
          className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-lg focus:outline-none"
          onClick={handleSend}
        >
          Send
        </button>
        <button 
          className="ml-4 px-4 py-2 text-white bg-green-500 rounded-lg focus:outline-none"
          onClick={toggleSender}
        >
          Switch to {sender === 'doctor' ? 'patient' : 'doctor'}
        </button>
      </div>
    </div>
  );
}

export default Chat;
