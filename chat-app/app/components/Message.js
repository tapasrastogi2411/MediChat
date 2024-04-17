// components/Message.js
function Message({ message }) {
    return (
      <div className={`m-4 p-4 rounded-lg text-black ${message.sender === 'doctor' ? 'bg-blue-200' : 'bg-green-200'}`}>
        <p className="font-bold">{message.sender}</p>
        <p>{message.text}</p>
      </div>
    );
  }
  
  export default Message;
  