import React, { useState, useRef, ChangeEvent } from 'react';

const Chatbot: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [botResponse, setBotResponse] = useState<React.ReactNode>('');
  const [loading, setLoading] = useState<boolean>(false);
  const searchTimeoutRef = useRef<number | null>(null);

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

 // Modify the handleSearch function to display heading, paragraph, and link
const handleSearch = async () => {
  if (userInput.trim() !== '') {
    try {
      setLoading(true);

      // Clear any existing timeout
      if (searchTimeoutRef.current !== null) {
        clearTimeout(searchTimeoutRef.current);
      }

      const response = await fetch(`http://localhost:3001/search?word=${encodeURIComponent(userInput)}`);
      const data = await response.json();

      if (data.matches && data.matches.length > 0) {
        setBotResponse(
          <>
            <p>Found {data.matches.length} occurrences of the word "{userInput}" on the website:</p>
            {data.matches.map((match, index) => (
              <div key={index}>
                <p>{match.heading}</p>
                <p>{match.line}</p>
                <p>Visit the page for more details: <a href={data.link} target="_blank" rel="noopener noreferrer">{data.link}</a></p>
              </div>
            ))}
          </>
        );
      } else {
        setBotResponse(data.message);
      }
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setBotResponse('An error occurred while processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  } else {
    setBotResponse('Please enter a word to search.');
  }
};

  return (
    <div>
      <div>
        <input type="text" value={userInput} onChange={handleUserInput} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {loading ? <p>Loading...</p> : botResponse}
      </div>
    </div>
  );
};

export default Chatbot;