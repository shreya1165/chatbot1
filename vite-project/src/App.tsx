import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './ContactForm';
import axios from 'axios';
import * as cheerio from 'cheerio';

// import { SocketConnect } from "./socket";
// import ChatWindow from './ChatWindow.js';
import ContactForm from './ContactForm';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useLocation } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import Chatbot from './Chatbot';

// import './WaitDots.tsx'

import ReactGA from 'react-ga';

import getLocation from './getLocation';


interface Coordinates {
    latitude: number;
    longitude: number;
}
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
                 
                    { url: "/blog/", text: "Services" },
                    { url: "/Contact Details", text: "Contact Details" },
                    { url: "/somethingelse/", text: "More Options" }
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
    const [chatHistory, setChatHistory] = useState([]);
    const [UserInput, setUserInput] = useState('');


    const handleRefresh = (event)=>{
        event.preventDefault();
       window.location.reload();
       
    };

    // const location = useLocation();

    // const [latitude, setLatitude] = useState<number | null>(null);
    // const [longitude, setLongitude] = useState<number | null>(null);
    


    useEffect(()=>{
        getLocation();
    }, []);

    // Get latitude and longitude data using browser's Geolocation API
    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 setLatitude(position.coords.latitude);
    //                 setLongitude(position.coords.longitude);
    //             },
    //             (error) => {
    //                 console.error('Error getting geolocation:', error);
    //             }
    //         );
            
    //     } else {
    //         console.error('Geolocation is not supported by this browser.');
    //     }
        
    // }, []);
    
    


    


    // useEffect(() => {
    //     if (latitude !== null && longitude !== null) {
    //         ReactGA.set({
    //             location: `${latitude}, ${longitude}`,
    //             page: location.pathname
    //         });
    //         ReactGA.pageview(location.pathname);
    //     }
    // }, [latitude, longitude, location]);

    // return (
    //     <div className="App">
    //       <SocketConnect />
    //     </div>
    //   );


    const [isInputDisabled, setIsInputDisabled] = useState(false);
    
    const [showContactForm, setShowContactForm] = useState(false);
    const toggleContactForm = () => {
        console.log('Toggling contact form');
        setShowContactForm(!showContactForm);
        setIsInputDisabled(!isInputDisabled); // Toggle the input field disabled state
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
                                { url: "/Contact Details", text: "Custom Software Development" },
                                { url: "/Contact Details", text: "Cloud App Development" },
                                { url: "/Contact Details", text: "Software Testing" },
                                { url: "/Contact Details", text: "Support and Maintenance" },
                                { url: "/Contact Details", text: "Scoping and Wireframing" },
                                { url: "/Contact Details", text: "Migration" },
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
                    body: <div>
                    CodeStore is a trusted web application development company that has been assisting businesses with the best technical talent for years to design and build custom websites and web applications for businesses across various industries. We combine creativity, innovation, and robust programming to provide custom web application development.
                    <br />
                    For more details, visit: <a href="https://codestoresolutions.com/web-application-development/"style={{ color: 'white' }}>https://codestoresolutions.com/web-application-development/</a>
                </div>,
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
                    body: <div>
                    If you operate in a highly competitive market and want to make your offerings more accessible to your customers you can build a mobile application. Our team of mobile app developers can understand your business requirements and come up with a solution.
                    <br />
                    For more details, visit: <a href="https://codestoresolutions.com/mobile-application-development/"style={{ color: 'white' }}>https://codestoresolutions.com/mobile-application-development/</a>
                </div>,
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
                    body: <div>
                    If you operate in a highly competitive market and want to make your offerings more accessible to your customers you can build a mobile application. Our team of mobile app developers can understand your business requirements and come up with a solution.
                    <br />
                    For more details, visit: <a href="https://codestoresolutions.com/ui-ux-design/"style={{ color: 'white' }}>https://codestoresolutions.com/ui-ux-design/</a>
                </div>,
                    timeout: 0
                };
                handleMessageDisplay(uiUxDesignResponse, chatMessages.length + 1);
                break;
            


                case "Custom Software Development":
                    const CustomSoftwareDevelopmentMessage: Message = {
                        author: "user",
                        body: "Custom Software Development",
                        timeout: 0
                    };
                    handleMessageDisplay(CustomSoftwareDevelopmentMessage, chatMessages.length);
        
                    const CustomSoftwareDevelopmentResponse: Message = {
                        author: "bot",
                        body: <div>
                        We provide custom software development services to help businesses and organizations of all sizes to improve their operations, streamline their processes, and achieve their goals. Our team of experienced software engineers understands the unique needs of our clients to design and develop software that addresses those needs.
                        <br />
                        For more details, visit: <a href="https://codestoresolutions.com/custom-software-development/"style={{ color: 'white' }}>https://codestoresolutions.com/custom-software-development/</a>
                    </div>,
                        timeout: 0
                    };
                    handleMessageDisplay(CustomSoftwareDevelopmentResponse, chatMessages.length + 1);
                    break;



                    case "Cloud App Development":
                    const CloudAppDevelopmentMessage: Message = {
                        author: "user",
                        body: "Cloud App Development",
                        timeout: 0
                    };
                    handleMessageDisplay(CloudAppDevelopmentMessage, chatMessages.length);
        
                    const CloudAppDevelopmentResponse: Message = {
                        author: "bot",
                        body: <div>
                        We offer a range of cloud app development services designed to meet the needs of businesses of all sizes and industries.
                        <br />
                        For more details, visit: <a href="https://codestoresolutions.com/cloud-app-development/"style={{ color: 'white' }}>https://codestoresolutions.com/cloud-app-development/</a>
                    </div>,
                        timeout: 0
                    };
                    handleMessageDisplay(CloudAppDevelopmentResponse, chatMessages.length + 1);
                    break;
            


                    case "Software Testing":
                        const SoftwareTestingMessage: Message = {
                            author: "user",
                            body: "Software Testing",
                            timeout: 0
                        };
                        handleMessageDisplay(SoftwareTestingMessage, chatMessages.length);
            
                        const SoftwareTestingResponse: Message = {
                            author: "bot",
                            body: <div>
                           Look no further ! CodeStore Technologies provides you the best ever Quality assurance services with an extremely skilled team of quality inspectors who work tirelessly to meet your objectives.
                            <br />
                            For more details, visit: <a href="https://codestoresolutions.com/software-testing-qa/"style={{ color: 'white' }}>https://codestoresolutions.com/software-testing-qa/</a>
                        </div>,
                            timeout: 0
                        };
                        handleMessageDisplay(SoftwareTestingResponse, chatMessages.length + 1);
                        break;


                        case "Support and Maintenance":
                        const SupportandMaintenanceMessage: Message = {
                            author: "user",
                            body: "Support and Maintenance",
                            timeout: 0
                        };
                        handleMessageDisplay(SupportandMaintenanceMessage, chatMessages.length);
            
                        const SupportandMaintenanceResponse: Message = {
                            author: "bot",
                            body: <div>
                           We at CodeStore are committed to ensuring the smooth operations of our clients through comprehensive and reliable support and maintenance services. Our support and maintenance services include bug-fixing, minor application changes, and adding new features.
                            <br />
                            For more details, visit: <a href="https://codestoresolutions.com/software-maintenance/"style={{ color: 'white' }}>https://codestoresolutions.com/software-maintenance/</a>
                        </div>,
                            timeout: 0
                        };
                        handleMessageDisplay(SupportandMaintenanceResponse, chatMessages.length + 1);
                        break;






                        case "Scoping and Wireframing":
                        const ScopingandWireframingMessage: Message = {
                            author: "user",
                            body: "Scoping and Wireframing",
                            timeout: 0
                        };
                        handleMessageDisplay(ScopingandWireframingMessage, chatMessages.length);
            
                        const ScopingandWireframingResponse: Message = {
                            author: "bot",
                            body: <div>
                           Scoping and wireframing are critical steps in the software development process. They define the scope of a project, set the foundation for design, and provide a clear understanding of what the final product will look like and how it will function.
                            <br />
                            For more details, visit: <a href="https://codestoresolutions.com/scope-development/"style={{ color: 'white' }}>https://codestoresolutions.com/scope-development/</a>
                        </div>,
                            timeout: 0
                        };
                        handleMessageDisplay(ScopingandWireframingResponse, chatMessages.length + 1);
                        break;





                        
                        case "Migration":
                        const MigrationMessage: Message = {
                            author: "user",
                            body: "Migration",
                            timeout: 0
                        };
                        handleMessageDisplay(MigrationMessage, chatMessages.length);
            
                        const MigrationResponse: Message = {
                            author: "bot",
                            body: <div>
                           We offer a comprehensive range of software porting and migration services aimed at helping organizations to transition their software from one platform to another with minimal disruption to business operations. Our experienced professionals will work closely with you to assess your current systems, understand your requirements, and develop a tailored solution that meets your specific needs.
                            <br />
                            For more details, visit: <a href="https://codestoresolutions.com/migration/"style={{ color: 'white' }}>https://codestoresolutions.com/migration/</a>
                        </div>,
                            timeout: 0
                        };
                        handleMessageDisplay(MigrationResponse, chatMessages.length + 1);
                        break;
                



                        case "More Options":
                            const SomethingelseMessage: Message = {
                                author: "user",
                                body: "More Options",
                                timeout: 0
                            };
                            handleMessageDisplay(SomethingelseMessage, chatMessages.length);
                
                            const SomethingelseResponse: Message = {
                                author: "bot",
                                body: [
                                    {
                                        text: "Choose from the below options:",
                                        options: [
                                            { url: "/blog/", text: "Industries we serve" },
                                            { url: "/Contact Details", text: "About Us" },
                                            { url: "/Contact Details", text: "Our Blogs" },
                                            { url: "/Contact Details", text: "Career at Codestore" },
                                            { url: "/Contact Details", text: "Life at CodeStore" },
                                            { url: "/Contact Details", text: "Hire us" },
                                            { url: "/Contact Details", text: "Our Portfolio" },
                                            { url: "/Contact Details", text: "Contact Details" },
                                            
                                        ]
                                    }
                                ],
                                timeout: 0
                            };
                            handleMessageDisplay(SomethingelseResponse, chatMessages.length + 1);
                            break;



                            case "Industries we serve":
                            const IndustriesweserveMessage: Message = {
                                author: "user",
                                body: "Industries we serve",
                                timeout: 0
                            };
                            handleMessageDisplay(IndustriesweserveMessage, chatMessages.length);
                
                            const IndustriesweserveResponse:{url:string,text:string, Message} = {
                                author: "bot",
                                body: [
                                    {
                                        text: "Following are the industries we serve:",
                                        options: [
                                            { url: "/healthcare-app-development", text: "Healthcare" },
                                            { url: "/energy-and-gas", text: "Energy and Gas" },
                                            { url: "/education-elearning", text: "Education & E-learning" },
                                            { url: "/transportation-logistics", text: "Transportation & Logistics" },
                                            { url: "/ecommerce", text: "ECommerce" },
                                            { url: "/fintech", text: "Fintech" },
                                            { url: "/on-demand", text: "On-Demand" },
                                            { url: "/marketing-advertisement", text: "Marketing & Advertisement" },
                                            { url: "/sports", text: "Sports" },
                                            
                                        ]
                                        
                                    }
                                    
                                ],
                                
                                timeout: 0
                            };
                            const handleButtonClick = (url: string) => {
                                window.location.href = `https://codestoresolutions.com${url}`;
                                  };
                            handleMessageDisplay(IndustriesweserveResponse, chatMessages.length + 1);
                            break;
                    
            
            



                            
            
            
                default:
                break;
        }
    };
    
    

    ReactGA.initialize('G-WHX6F7HDK4');
    

    // useEffect(() => {
    //   ReactGA.set({ page: location.pathname });
    //   ReactGA.pageview(location.pathname);
    // }, [location]);
  

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
    if (e.currentTarget) {
        e.currentTarget.reset(); // Reset the form if the current target exists
    } else {
        console.error('Form element not found');
    }

    const userInput = (formData.get('input') as string);

    // Create a bot response based on user input
    let botResponse: Message;




// const Container: React.FC = () => {
//     return (
//         <div id="container">
//             <div id="loading-bubble">
//                 <div className="spinner">
//                     <div className="bounce1"></div>
//                     <div className="bounce2"></div>
//                     <div className="bounce3"></div>
//                 </div>
//             </div>
//         </div>
//     );
// }







    const userMessage: Message = {
        author: 'user',
        body: userInput,
        timeout: 0
    };

    // Display the user's message and the bot's response
    handleMessageDisplay(userMessage, chatMessages.length);

    if (userInput.includes('service')||userInput.includes('Service')||userInput.includes('SERVICE')) {
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
    } else if (userInput.includes('help')||userInput.includes('Help')||userInput.includes('HELP')) {
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
    } else if (userInput.includes('hello')||userInput.includes('Hello')||userInput.includes('HELLO') || userInput.includes('hi')||userInput.includes('Hi')||userInput.includes('HI') || userInput.includes('hey there')||userInput.includes('Hey there')||userInput.includes('HEY THERE') || userInput.includes('hey')||userInput.includes('Hey')||userInput.includes('HEY')) {
        botResponse = {
            author: 'bot',
            body: 'Hi ',
            timeout: 0
        };
    } else if (userInput.includes('bye')||userInput.includes('Bye')||userInput.includes('BYE') || userInput.includes('bbye') || userInput.includes('see u') || userInput.includes('thanks bbye')) {
        botResponse = {
            author: 'bot',
            body: 'Bye, See you soon',
            timeout: 0
        };
    } else if (userInput.includes('contact')||userInput.includes('Contact')||userInput.includes('CONTACT')) {
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
    } else if (userInput.includes('healthcare')||userInput.includes('Healthcare')||userInput.includes('HEALTHCARE') || userInput.includes('health care')||userInput.includes('Health care')|| userInput.includes('Health Care') || userInput.includes('health')||userInput.includes('Health')) {
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
                                url: "/blog/", text: "Web Development" 
                            },
                            { 
                                url: "/somethingelse/", 
                                text: "Something else" 
                            }
                        ]
                    }
                ],
                timeout: 0
            };


        
            
            
                
    
            }else if (userInput.includes('vision')||userInput.includes('mission')||userInput.includes('about')) {
                botResponse = {
                    author: 'bot',
                    body: (
                        <div>
                    CodeStore is an offshore custom software development company based out of India. Our expertise lies in creating high-quality, innovative custom software solutions for businesses of all sizes.

Our enthusiastic team of experienced developers has expertise in various programming languages and technologies to serve our client’s unique needs and requirements across the globe. We are committed to providing our clients with the best possible service, and we take pride in delivering software that exceeds our client’s expectations.
                    <br />
                    For more details, visit: <a href="https://codestoresolutions.com/about-us/" style={{ color: 'white' }}>https://codestoresolutions.com/healthcare-app-development/</a>
                </div>
                    ),
                    timeout: 0
                };
                
    
    
    
    



        
   
   




}




else{
    

    // Display the user's message and the bot's response
 
    // Define the URLs to search for user input
    botResponse = {
        author: 'bot',
        body: (
            <div>
                {/* Include the Chatbot component here */}
                <Chatbot />
            </div>
        ),
        timeout: 0
    };


}
handleMessageDisplay(botResponse, chatMessages.length + 1);

    // Add the user's message to the chat
    
  
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




            
     
{showContactForm && <ContactForm toggleContactForm={toggleContactForm} />}


            <form className="input-div" onSubmit={handleSubmit}>
            <button className="refresh" onClick={(event) => handleRefresh(event)}><img src="./reload.png" alt="Refresh" style={{ width: '30px', height: '30px'}} /></button>
                <input
                    type="text"
                    name="input"
                    className="input-message"
                    placeholder="Type your message here..."
                    autoComplete="off"
                    required
                    // disabled={isInputDisabled} // Set the disabled attribute based on state
                />
                
                <button type="submit" className="input-send">
                   
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M490.2 232.7L61.8 4.5C55-1.4 45.3-.4 39.3 5.3c-6 5.7-6.8 14.8-1.1 20.8L443.5 255 38.2 486.9c-5.7 6-5 15.1 1.1 20.8 3.4 3.2 7.8 4.7 12.2 4.7 4.4 0 8.8-1.6 12.2-4.7l428.4-228.2c6.1-5.8 6.8-15 .9-20.8z" fill="currentColor"/>
                    </svg>
                </button>
            </form>
            <SpeedInsights />
            
            <Analytics />
        </div>
    );
}

export default App;