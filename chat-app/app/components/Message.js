function Message({ message }) {
    return (
      <div>
        <strong>{message.sender}</strong>: {message.text}
      </div>
    );
  }
  
  export default Message;
  