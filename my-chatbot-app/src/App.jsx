import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import './App.css'; // Import the CSS file
import { SocketConnect } from "./socket";


function App() {


  <div className="App">
  <SocketConnect />
</div>


  const [messages, setMessages] = useState([]);

  const sendMessage = async (message) => {
    try {
      const response = await fetch('http://localhost:3001/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      return responseData; // Return the response data from the server
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to send message'); // Throw an error if the request fails
    }
  };

  return (
    <div className="app-container">
      <div className="chat-window">
        <h1 className="chat-title">Chatbot</h1>
        <ChatWindow messages={messages} sendMessage={sendMessage} />
        
      </div>
      
    </div>
  );
}

export default App;
