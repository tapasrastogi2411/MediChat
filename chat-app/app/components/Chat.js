"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";
import Message from "./Message";

const CDNURL =
    "https://wddpjsbgtkxmqvnkxhih.supabase.co/storage/v1/object/public/message-images/";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [sender, setSender] = useState("doctor"); // New state for sender
    const messagesEndRef = useRef(null); // New ref for the last message

    const handleSend = async () => {
        if (newMessage.trim() === "") {
            // Don't send the message if it's empty
            return;
        }

        const message = {
            id: uuidv4(),
            sender: sender, // Use the sender state here
            text: newMessage,
            created_at: new Date(),
            // imageURL: null,
        };

        // Insert the new message into the Supabase messages table
        const { error } = await supabase.from("messages").insert([message]);

        if (error) {
            console.error("Error inserting message:", error);
            return;
        }

        setMessages([...messages, message]);
        setNewMessage("");
    };

    // Fetching messages from the Supabase messages table
    useEffect(() => {
        const fetchMessages = async () => {
            const { data, error } = await supabase.from("messages").select("*");
            if (error) {
                console.error("Error fetching messages:", error);
                return;
            }
            setMessages(data);
        };

        fetchMessages();
    }, []);

    // Deleting a message
    const handleDeleteMessage = async (id) => {
        // Delete the message from the Supabase messages table
        const { error } = await supabase.from("messages").delete().eq("id", id);
        console.log("Deleting message with id:", id);
        if (error) {
            console.error("Error deleting message:", error);
            return;
        }
        const deletedMessages = messages.filter((message) => message.id !== id);
        setMessages(deletedMessages);
    };

    // New function to handle image upload
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];

        // Upload the image to the Supabase message-images storage
        const { data, error } = await supabase.storage
            .from("message-images")
            .upload("public/" + file?.name, file);

        if (data) {
            const message = {
                id: uuidv4(),
                sender: sender,
                imageURL: CDNURL + "public/" + file?.name,
                imageName: "public/" + file?.name,
                created_at: new Date(),
            };
            // Add this to the messages state
            setMessages([...messages, message]);
        } else {
            console.log(error);
        }
    };

    // Deleting an image
    const handleDeleteImage = async (imageName) => {
        // Delete the image from the Supabase images table
        const { error } = await supabase.storage
            .from("message-images")
            .remove([imageName]);
        console.log("Deleting image with imageName", imageName);
        if (error) {
            console.error("Error deleting image:", error);
            return;
        }
        const deletedImages = messages.filter(
            (image) => image.imageName !== imageName
        );
        setMessages(deletedImages);
    };

    // New function to toggle sender
    const toggleSender = () => {
        setSender(sender === "doctor" ? "patient" : "doctor");
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="overflow-auto">
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        message={message}
                        onDeleteMessage={handleDeleteMessage}
                        onDeleteImage={handleDeleteImage}
                    />
                ))}
                <div ref={messagesEndRef} /> {/* New div for the ref */}
            </div>
            <div className="flex items-center p-4 bg-white border-t border-gray-200">
                <input
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="ml-4 px-4 py-2 text-white bg-purple-500 rounded-lg focus:outline-none"
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
                    Switch to {sender === "doctor" ? "patient" : "doctor"}
                </button>
            </div>
        </div>
    );
}

export default Chat;
