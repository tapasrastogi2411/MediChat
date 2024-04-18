import { useEffect, useRef } from 'react';

function Message({ message }) {
  const messageRef = useRef(null);

  useEffect(() => {
    if (message.image && messageRef.current) {
      const img = new Image();
      img.src = message.image;
      img.onload = () => {
        messageRef.current.scrollIntoView({ behavior: 'smooth' });
      };
    }
  }, [message]);

  return (
    <div ref={messageRef} className={`m-4 p-4 rounded-lg text-black ${message.sender === 'doctor' ? 'bg-blue-200' : 'bg-green-200'}`}>
      <p className="font-bold">{message.sender}</p>
      {message.image ? (
        <img src={message.image} alt="Uploaded content" className="w-full h-auto max-w-md max-h-100" />
      ) : (
        <p>{message.text}</p>
      )}
    </div>
  );
}

export default Message;
