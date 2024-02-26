import React, { useState } from 'react';

function ChatWindow({ sendMessage }) {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await sendMessage(message);
    setResponse(response.answer);
    setMessage('');
  };

  return (
    <div className='input'>
      <form onSubmit={handleSubmit}>
       
        <input
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        /><br />
        <button type="submit" id="send-button">Send</button>
      </form>
      {response && <div> {response}</div>}
    </div>
  );
}

export default ChatWindow;
