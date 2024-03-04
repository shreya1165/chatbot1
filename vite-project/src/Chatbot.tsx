import React, { useState, useRef, ChangeEvent } from 'react';

interface SearchResult {
  paragraphs: string[];
  link: string;
}

interface ChatbotProps {
  initialUserInput: string;
}

const Chatbot: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [botResponse, setBotResponse] = useState<React.ReactNode>('');
  const [loading, setLoading] = useState<boolean>(false);
  const searchTimeoutRef = useRef<number | null>(null);

  const highlightWord = (
    paragraph: string,
    word: string,
  ): React.ReactNode[] => {
    const regex = new RegExp('(${word})', 'g');
    return paragraph.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ backgroundColor: 'blue' }}>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };
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

        const response = await fetch(
          `http://localhost:5000/search?word=${encodeURIComponent(userInput)}`,
        );
        const data = await response.json();

        if (data.matches && data.matches.length > 0) {
          setBotResponse(
            <>
              <p>Found {data.matches.length} occurrences of the word "{userInput}" on the website:</p>
              {data.matches.map((match, index) => (
        <div key={index}>
          <p>Heading: {match.heading !== undefined ? match.heading : 'No heading'}</p>
          <p>Line: {match.line !== undefined ? match.line : 'No paragraph'}</p>
                  {data.link && (
                    <p>
                      Visit the page for more details:{' '}
                      <a
                        href={data.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {data.link}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </>,
          );
        } else {
          setBotResponse(data.message);
        }
      } catch (error) {
        console.error('Error fetching bot response:', error);
        setBotResponse(
          'An error occurred while processing your request. Please try again.',
        );
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
        <h4>Hi, I think you are searching for Something from our website. Please type a word whose details you want to know...</h4>
        <input type="text" value={userInput} onChange={handleUserInput} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>{loading ? <p>Loading...</p> : botResponse}</div>
    </div>
  );
};

export default Chatbot;
