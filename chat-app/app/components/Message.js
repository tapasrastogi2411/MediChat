import { useEffect, useRef } from "react";

function Message({ message, onDelete }) {
    const messageRef = useRef(null);

    useEffect(() => {
        if (message.image && messageRef.current) {
            const img = new Image();
            img.src = message.image;
            img.onload = () => {
                messageRef.current.scrollIntoView({ behavior: "smooth" });
            };
        }
    }, [message]);

    return (
        <div
            ref={messageRef}
            className={`m-4 p-4 rounded-lg text-black ${
                message.sender === "doctor" ? "bg-blue-200" : "bg-green-200"
            }`}
        >
            <p className="font-bold">{message.sender}</p>
            {message.image ? (
                <img
                    src={message.image}
                    alt="Uploaded content"
                    className="w-full h-auto max-w-md max-h-100 pt-3 pb-2"
                />
            ) : (
                <p>{message.text}</p>
            )}
            <button
                onClick={() => onDelete(message.id)}
                className="mt-2 px-2 py-1  text-sm text-white bg-red-500 rounded hover:bg-red-600"
            >
                Delete
            </button>
        </div>
    );
}

export default Message;
