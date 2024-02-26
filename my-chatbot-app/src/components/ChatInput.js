import React, { useState } from 'react';
import axios from 'axios';

function ChatInput() {
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {  
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/chatbot', {
        message: message
      });
      console.log(response.data.answer);
      // Handle the response from the backend, update chat window, etc.
    } catch (error) {
      console.error('Error:', error);
    }
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
    
  );
}

export default ChatInput;
