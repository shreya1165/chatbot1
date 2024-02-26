import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './ContactForm.tsx';
import axios from 'axios';
import * as cheerio from 'cheerio';
// import { SocketConnect } from "./socket";
// import ChatWindow from './ChatWindow.js';
import ContactForm from './ContactForm.tsx';
import { SpeedInsights } from "@vercel/speed-insights/react";

import ReactGA from 'react-ga';

interface Message {
    author: string;
    body: string | MessageBody[];
    timeout: number;
}

interface MessageBody {
    url: string;
    text: string;
}

const Messages: Message[] = [
    {
        author: "bot",
        body: "Hello",
        timeout: 800
    },
    {
        author: "bot",
        body: [
            {
                text: "How may I help you?",
                options: [
                    { url: "/blog/", text: "About Us" },
                    { url: "/blog/", text: "Services" },
                    { url: "/Contact Details", text: "Contact Details" },
                    // { url: "https://github.com/onefastsnail", text: "Something else" }
                ]
            }
        ],
        timeout: 5000
    
    }
];




interface MessageProps {
    data: Message;
    handleClick: (option: MessageBody) => void;
}
const Message: React.FC<MessageProps> = ({ data, handleClick }) => {
    const { author, body } = data;

    let finalBody: JSX.Element | JSX.Element[];
    let avatarImageSrc = '';
    let messageClass = '';

    if (author === 'bot') {
        avatarImageSrc = 'images/chatbot.png'; // Path to the bot's avatar image
        messageClass = 'c-chat__item--bot'; // Apply class for bot messages
    } else {
        avatarImageSrc = 'images/user.png'; // Path to the user's avatar image
        messageClass = 'c-chat__item--user'; // Apply class for user messages
    }

    if (Array.isArray(body)) {
        finalBody = body.map((item, index) => {
            if (item.options) {
                return (
                    <div key={index}>
                        <div class="c-chat__container">
                            
                        <div className="c-chat__message">{item.text}</div>
                        
                        <div>
                            {item.options.map((option, optionIndex) => (
                                <a href="#" className="c-chat__action" key={optionIndex} onClick={() => handleClick(option)}>
                                    {option.text}
                                </a>
                                
                            ))}
                        </div>
                        </div>
                        
                    </div>
                );
            } else {
                return (
                    <div className="c-chat__message" key={index}>
                        {item.text}
                    </div>
                );
            }
        });
    } else {
        finalBody = <div className="c-chat__message">{body}</div>;
    }

    return (
        <li className={"c-chat__item " + messageClass}>
        <img src={avatarImageSrc} alt="Avatar" className="avatar" />
        <div className="message-content">{finalBody}</div>
    </li>
    );
};


const App: React.FC = () => {
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const chatAreaRef = useRef<HTMLDivElement>(null);

    
    // return (
    //     <div className="App">
    //       <SocketConnect />
    //     </div>
    //   );


    
    
    const [showContactForm, setShowContactForm] = useState(false);
    const toggleContactForm = () => {
        console.log('Toggling contact form');
        setShowContactForm(!showContactForm);
    };
    
    

    useEffect(() => {
        if (chatMessages.length === 0) {
            setChatMessages(Messages);
        }
    }, [chatMessages]);

    useEffect(() => {
        if (chatAreaRef && chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [chatMessages]);
    

    const handleMessageDisplay = (message: Message, index: number) => {
        setTimeout(() => {
            setChatMessages(prevMessages => [...prevMessages, message]);
        }, index * 300);
    };

    console.log(chatMessages)

    const handleClick = (option: MessageBody) => {
        switch (option.text) {
            case "Contact Details":
                toggleContactForm(); // Toggle the contact form
                break;
            case "Services":
                const userMessage: Message = {
                    author: "user",
                    body: "Services",
                    timeout: 0
                };
                handleMessageDisplay(userMessage, chatMessages.length);
    


                
                const servicesMessage: Message = {
                    author: "bot",
                    body: [
                        {
                            text: "Great, these are the services we provide:",
                            options: [
                                { url: "/blog/", text: "Web Development" },
                                { url: "/Contact Details", text: "App Development" },
                                { url: "/Contact Details", text: "UI/UX Design" },
                            ]
                        }
                    ],
                    timeout: 0
                };
                handleMessageDisplay(servicesMessage, chatMessages.length + 1);
                break;
            case "Web Development":
                const webDevelopmentMessage: Message = {
                    author: "user",
                    body: "Web Development",
                    timeout: 0
                };
                handleMessageDisplay(webDevelopmentMessage, chatMessages.length);
    
                const webDevelopmentResponse: Message = {
                    author: "bot",
                    body: "Web development: CodeStore is a trusted web application development company that has been assisting businesses with the best technical talent for years to design and build custom websites and web applications for businesses across various industries. We combine creativity, innovation, and robust programming to provide custom web application development. For more details visit: <a href='https://codestoresolutions.com/web-application-development/'>Click here</a>",
                    timeout: 0
                };
                handleMessageDisplay(webDevelopmentResponse, chatMessages.length + 1);
                break;
            case "App Development":
                const appDevelopmentMessage: Message = {
                    author: "user",
                    body: "App Development",
                    timeout: 0
                };
                handleMessageDisplay(appDevelopmentMessage, chatMessages.length);
    
                const appDevelopmentResponse: Message = {
                    author: "bot",
                    body: "App development: We are one of the leading mobile application development companies in India and work extensively with businesses across various industries to build custom mobile applications to cater to business requirements. We understand the importance of having a robust mobile presence in today’s digital landscape and can create high-quality, user-friendly mobile apps for our clients across the globe. For more details visit: <a href='https://codestoresolutions.com/mobile-application-development/'>Click here</a>",
                    timeout: 0
                };
                handleMessageDisplay(appDevelopmentResponse, chatMessages.length + 1);
                break;
            case "UI/UX Design":
                const uiUxDesignMessage: Message = {
                    author: "user",
                    body: "UI/UX Design",
                    timeout: 0
                };
                handleMessageDisplay(uiUxDesignMessage, chatMessages.length);
    
                const uiUxDesignResponse: Message = {
                    author: "bot",
                    body: "UI/UX Design: CodeStore offers various UI/UX services designed to help businesses create engaging and user-friendly digital experiences.In today’s fast-paced and competitive digital landscape, creating a great user experience is crucial to the success of any website, app, or product. A great UI/UX design can help businesses engage users, improve brand loyalty and increase conversions. For more details visit: <a href='https://codestoresolutions.com/ui-ux-design/'>Click here</a>",
                    timeout: 0
                };
                handleMessageDisplay(uiUxDesignResponse, chatMessages.length + 1);
                break;
            default:
                break;
        }
    };
    
    

    

// Update the fetch URL in your frontend code to match the backend server's URL
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    ReactGA.event({
        category: 'User Interaction',
        action: 'Message Typing',
        label: 'Chatbot',
      });
  
      // Reset the message input field

    
    // Access the form data from the event target
    const formData = new FormData(e.currentTarget);
    const userInput = (formData.get('input') as string).toLowerCase();

    // Create a bot response based on user input
    let botResponse: Message;

    const userMessage: Message = {
        author: 'user',
        body: userInput,
        timeout: 0
    };

    // Display the user's message and the bot's response
    handleMessageDisplay(userMessage, chatMessages.length);

    if (userInput.includes('service')) {
        botResponse = {
            author: 'bot',
            body: [
                {
                    text: "Great, these are the services we provide:",
                    options: [
                        { url: "/blog/", text: "Web Development" },
                        { url: "/Contact Details", text: "App Development" },
                        { url: "/Contact Details", text: "UI/UX Design" },
                    ]
                }
            ],
            timeout: 0
        };
    } else if (userInput.includes('help')) {
        botResponse = {
            author: 'bot',
            body: [
                {
                    text: "How may I help you?",
                    options: [
                        { url: "/blog/", text: "Services" },
                        { url: "/Contact Details", text: "Contact Details" },
                        // { url: "https://github.com/onefastsnail", text: "Something else" }
                    ]
                }
            ],
            timeout: 0
        };
    } else if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('hey there') || userInput.includes('hey')) {
        botResponse = {
            author: 'bot',
            body: 'Hi ',
            timeout: 0
        };
    } else if (userInput.includes('bye') || userInput.includes('bbye') || userInput.includes('see u') || userInput.includes('thanks bbye')) {
        botResponse = {
            author: 'bot',
            body: 'Bye, See you soon',
            timeout: 0
        };
    } else if (userInput.includes('contact')) {
        botResponse = {
            author: 'bot',
            body: (
                <div>
                    We’d love to hear from you! You can contact us using the below form or given email ids or phone numbers. We typically respond to any inquiry within one business day. <br /><br />
                    Email: <br />
                    Sales – sales@codestoresolutions.com <br />
                    Enquiries – info@codestoresolutions.com <br />
                    Recruitment – hr@codestoresolutions.com <br /><br />
                    Phone: <br />
                    USA +1 (213) 814-4265 <br />
                    India +91 95997 20600
                </div>
            ),
    
            timeout: 0
        };
    } else if (userInput.includes('healthcare') || userInput.includes('health care') || userInput.includes('health')) {
        botResponse = {
            author: 'bot',
            body: (
                <div>
                    Transform Healthcare IT with our cutting-edge software services. We build custom software solutions for the healthcare industry, meeting your geography’s regulations and compliances requirement.
                    <br />
                    For more details, visit: <a href="https://codestoresolutions.com/healthcare-app-development/" style={{ color: 'white' }}>https://codestoresolutions.com/healthcare-app-development/</a>
                </div>
            ),
    
            timeout: 0
        };
      }  else if (userInput.includes('web tech')||userInput.includes('web')) {
            botResponse = {
                author: 'bot',
                body: [
                    {
                        text: "Did you mean any of these?",
                        options: [
                            { 
                                url: "https://codestoresolutions.com/web-application-development/", 
                                text: "Web App: If you plan to build an application for your business that can be accessed from anywhere and provide a super-fine workflow, our team can help you achieve that. We have skills available across various technologies to build robust, scalable, and secured web applications." 
                            },
                            { 
                                url: "contact/", 
                                text: "Something else... Contact Team" 
                            }
                        ]
                    }
                ],
                timeout: 0
            };


        }else if (userInput.includes('app')||userInput.includes('it')) {
            botResponse = {
                author: 'bot',
                body: (
                    <div>
                        <p>Are you searching for?

</p>
                        <ul>
                            <li><button onClick={() => window.open("https://codestoresolutions.com/web-application-development/", "_blank")}>Web Application Development</button></li>
                            <li><button onClick={() => window.open("https://codestoresolutions.com/mobile-application-development/", "_blank")}>Mobile App Development</button></li>
                            <li><button onClick={() => window.location.href = "contact/"}>Something else... Contact Team</button></li>
                        </ul>
                    </div>
                ),
                timeout: 0
            };
            
            
                
    
            }else if (userInput.includes('vision')||userInput.includes('mission')||userInput.includes('about')) {
                botResponse = {
                    author: 'bot',
                    body: [
                        {
                            text: "Are you searching for?",
                            options: [
                                { 
                                    url: "https://codestoresolutions.com/web-application-development/", 
                                    text: "Our vision is to be a leading provider of offshore software development services by delivering high-quality work to our clients" 
                                },
                                { 
                                    url: "https://codestoresolutions.com/web-application-development/", 
                                    text: "Our mission is to help our clients fill the gap in their engineering capacity, increase productivity, reduce the cost of operations, and stay ahead of the competition." 
                                },
                                { 
                                    url: "https://codestoresolutions.com/web-application-development/", 
                                    text: "Our People: The people we have are committed to delivering high-quality software services to our clients." 
                                },
                                { 
                                    url: "contact/", 
                                    text: "Something else... Contact Team" 
                                }
                            ]
                        }
                    ],
                    timeout: 0
                };
                
    
    
    
    



        
   
   




}




else{
    const userMessage: Message = {
        author: 'user',
        body: userInput,
        timeout: 0
    };

    // Display the user's message and the bot's response
    handleMessageDisplay(userMessage, chatMessages.length);
    // Define the URLs to search for user input
    const urlsToSearch = [
        'https://codestoresolutions.com/',
        'https://codestoresolutions.com/about-us/',
        'https://codestoresolutions.com/portfolio/',
        'https://codestoresolutions.com/contact-us/',
        'https://codestoresolutions.com/blog/',
        'https://codestoresolutions.com/career/'
        
    ];

    let searchResults = [];

    // Search each URL for the user input
    for (const url of urlsToSearch) {
        try {
            const response = await axios.get(url);
            const html = response.data;
            const $ = cheerio.load(html);
            const text = $('body').text().toLowerCase();
            if (text.includes(userInput)) {
                // Create anchor links for each occurrence of the search term in the paragraph
                const regex = new RegExp(userInput, 'gi'); // Case-insensitive search
                const matches = text.match(regex);
                if (matches) {
                    matches.forEach(match => {
                        // Modify the URL to include anchor links to the specific word
                        const anchorURL = `${url}#${match}`;
                        searchResults.push(anchorURL);
                    });
                }
            }
        } catch (error) {
            console.error('Error occurred while fetching or parsing HTML:', error);
        }
    }
    
    let nextSearchIndex = 0; // Initialize nextSearchIndex

    // Define a function to handle the "Next" button click
    const handleNextSearch = async () => {
        nextSearchIndex++; // Increment nextSearchIndex for the next search
        await performSearch(); // Call performSearch again for the next search
    };
    
    // Define the performSearch function
    const performSearch = async () => {
        if (searchResults.length > 0) {
            const searchResult = searchResults[nextSearchIndex % searchResults.length]; // Get the next search result in a loop
            try {
                const response = await axios.get(searchResult);
                const html = response.data;
                const $ = cheerio.load(html);
    
                // Extract the heading
                const heading = $('h1').text(); // Assuming the heading is in an h1 tag
    
                let foundParagraph = ''; // Initialize an empty string to store the found paragraph
                let anchorLinks = []; // Initialize an array to store anchor links
    
                $('p').each((index, element) => {
                    const paragraphText = $(element).text().trim();
                    if (paragraphText.toLowerCase().includes(userInput.toLowerCase())) {
                        // Update the found paragraph
                        foundParagraph = paragraphText;
                        // Create anchor links for each occurrence of the search term in the paragraph
                        const regex = new RegExp(userInput, 'gi'); // Case-insensitive search
                        const matches = paragraphText.match(regex);
                        if (matches) {
                            matches.forEach(match => {
                                // Create anchor link and push to the array
                                const anchorLink = `<a href="${searchResult}#${match}" target="_blank">${match}</a>`;
                                anchorLinks.push(anchorLink);
                            });
                        }
                        return false; // Exit the loop after finding the first matching paragraph
                    }
                });
    
                // Construct the bot response
                botResponse = {
                    author: 'bot',
                    body: (
                        <div>
                            <h4>{heading}</h4>
                            {foundParagraph && <p dangerouslySetInnerHTML={{ __html: foundParagraph }}></p>}
                            {anchorLinks.map((link, index) => (
                                <p key={index} dangerouslySetInnerHTML={{ __html: link }}></p>
                            ))}
                            <button><a href={searchResult} target="_blank">Read more</a></button> {/* Provide a link to the full content */}
                            <button onClick={handleNextSearch}>Something Else</button> {/* Option for next search */}
                        </div>
                    ),
                    timeout: 0
                };
            } catch (error) {
                console.error('Error occurred while fetching or parsing HTML:', error);
                botResponse = {
                    author: 'bot',
                    body: `Error occurred while fetching or parsing HTML for "${userInput}"`,
                    timeout: 0
                };
            }
        } else {
            botResponse = {
                author: 'bot',
                body: `Sorry, "${userInput}" was not found on the website.`,
                timeout: 0
            };
        }
    };
    
    
    // Initial call to perform the search
    await performSearch();
    
    


}
    

    // Add the user's message to the chat
    
    handleMessageDisplay(botResponse, chatMessages.length + 1);

    // Clear the input field after submission
    if (e.currentTarget) {
        e.currentTarget.reset(); // Reset the form if the current target exists
    } else {
        console.error('Form element not found');
    }
};


    
    

    return (
        <div className="main-card">
            <div className="main-title">
                <div>
                    <img src="/images/codestore-2.png" alt="Codestore Logo" className="logo" />
                </div>
                <span className="title">Codestore-Chatbot</span>
            </div>
            <div className="line"></div>
            <div className="chat-area"  ref={chatAreaRef}>
    <ul className="c-chat__list">
        {chatMessages.map((message, index) => (
            <Message key={index} data={message} handleClick={handleClick} />
        ))}
    </ul>
</div>





            
     
            {showContactForm && <ContactForm />}


            <form className="input-div" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="input"
                    className="input-message"
                    placeholder="Type your message here..."
                    autoComplete="off"
                    required
                />
                
                <button type="submit" className="input-send">
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M490.2 232.7L61.8 4.5C55-1.4 45.3-.4 39.3 5.3c-6 5.7-6.8 14.8-1.1 20.8L443.5 255 38.2 486.9c-5.7 6-5 15.1 1.1 20.8 3.4 3.2 7.8 4.7 12.2 4.7 4.4 0 8.8-1.6 12.2-4.7l428.4-228.2c6.1-5.8 6.8-15 .9-20.8z" fill="currentColor"/>
                    </svg>
                </button>
            </form>
            <SpeedInsights />
        </div>
    );
}

export default App;