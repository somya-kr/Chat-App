import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { BsMoon, BsSun } from "react-icons/bs";
import "../styles/Chat.css";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]); // Store the messages
  const [newMessage, setNewMessage] = useState(""); // Store the new message
  const [darkMode, setDarkMode] = useState(false); // Toggle dark mode
  const messagesRef = collection(db, "messages"); // Reference to the "messages" collection in Firestore

  useEffect(() => {
    // Query the messages collection based on the room and order them by createdAt
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );

    // Set up a snapshot listener to listen for changes in the messages collection
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;

    // Add a new document to the messages collection with the new message
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage(""); // Clear the new message input
  };

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode); // Toggle the darkMode state
  };

  return (
    <div className={`chat-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="chat-header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
        <div className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <BsSun /> : <BsMoon />}
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <div className="message-content">
              <span className="user">{message.user}</span>
              <span className="message-text">{message.text}</span>
              <span className="message-time">
                {new Date(message.createdAt?.toDate()).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className={`new-message-input ${darkMode ? "dark-mode-input" : ""}`}
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
