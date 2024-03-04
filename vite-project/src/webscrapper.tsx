// import React, { useState } from 'react';
// import './App.css'; // Import the CSS file
// import * as cheerio from 'cheerio';
// import axios from 'axios';
// import './App'





 
// const performSearch = async (userInput) => {
//   if (searchResults.length > 0) {
//     try {
//       for (const searchResult of searchResults) {
//         const response = await axios.get(searchResult.link);
//         const html = response.data;
//         const $ = cheerio.load(html);
 
//         // Extract the heading
//         const heading = $('h1').text();
 
//         let foundParagraph = '';
//         let anchorLinks = [];
 
//         $('p').each((index, element) => {
//           const paragraphText = $(element).text().trim();
 
//           if (paragraphText.toLowerCase().includes(userInput.toLowerCase())) {
//             foundParagraph = paragraphText;
 
//             // Create anchor links for each occurrence of the search term in the paragraph
//             const regex = new RegExp(userInput, 'gi');
//             const matches = paragraphText.match(regex);
 
//             if (matches) {
//               matches.forEach(match => {
//                 // Create anchor link and push to the array
//                 const anchorLink = `<a href="${searchResult.link}#${match}" target="_blank">${match}</a>`;
//                 anchorLinks.push(anchorLink);
//               });
//             }
 
//             // Return the relevant link to the user
//             console.log(`Found in ${searchResult.link}: ${heading}`, foundParagraph, anchorLinks);
//             return;
//           }
//         });
 
//         // If not found, continue to the next link
//         console.log(`Not found in ${searchResult.link}`);
//       }
 
//       // If no matches found in any link, provide a fallback or additional handling
//       console.log('User input not found in any link.');
 
//       // Rest of your code...
//     } catch (error) {
//       console.error('Error performing search:', error);
//     }
//   }
// };
 
// // Example usage
// // const userInput = 'your user input'; // Replace with the actual user input
// performSearch(userInput);


















// // const urlsToSearch = [
// //     'https://codestoresolutions.com/',
// //     'https://codestoresolutions.com/about-us/',
// //     'https://codestoresolutions.com/portfolio/',
// //     'https://codestoresolutions.com/contact-us/',
// //     'https://codestoresolutions.com/blog/',
// //     'https://codestoresolutions.com/career/',
// //     'https://codestoresolutions.com/culture/life-at-codestore/',
// //     'https://codestoresolutions.com/custom-software-development/',
// //     'https://codestoresolutions.com/web-application-development/',
// //     'https://codestoresolutions.com/mobile-application-development/',
// //     'https://codestoresolutions.com/cloud-app-development/',
// //     'https://codestoresolutions.com/ui-ux-design/',
// //     'https://codestoresolutions.com/scope-development/',
// //     'https://codestoresolutions.com/software-testing-qa/',
// //     'https://codestoresolutions.com/software-maintenance/',
// //     'https://codestoresolutions.com/migration/',
// //     'https://codestoresolutions.com/healthcare-app-development/',
// //     'https://codestoresolutions.com/energy-gas-app-development/',
// //     'https://codestoresolutions.com/education-e-learning-app-development/',
// //     'https://codestoresolutions.com/logistics-app-development/',
// //     'https://codestoresolutions.com/e-commerce-app-development/',
// //     'https://codestoresolutions.com/finance-app-development/',
// //     'https://codestoresolutions.com/on-demand-app-development/',
// //     'https://codestoresolutions.com/digital-marketing/',
// //     'https://codestoresolutions.com/sports-app-development/'

    
// // ];
  

// // // Clear the input field after submission
// // if (e.currentTarget) {
// //     e.currentTarget.reset(); // Reset the form if the current target exists
// // } else {
// //     console.error('Form element not found');
// // }

// // let searchResults = [];

// // // Search each URL for the user input
// // for (const url of urlsToSearch) {
// //     try {
// //         const response = await axios.get(url);
// //         const html = response.data;
// //         const $ = cheerio.load(html);
// //         const text = $('body').text().toLowerCase();
// //         if (text.includes(userInput)) {
// //             // Create anchor links for each occurrence of the search term in the paragraph
// //             const regex = new RegExp(userInput, 'gi'); // Case-insensitive search
// //             const matches = text.match(regex);
// //             if (matches) {
// //                 matches.forEach(match => {
// //                     // Modify the URL to include anchor links to the specific word
// //                     const anchorURL = `${url}#${match}`;
// //                     searchResults.push(anchorURL);
// //                 });
// //             }
// //         }
// //     } catch (error) {
// //         console.error('Error occurred while fetching or parsing HTML:', error);
// //     }
// // }

// // let nextSearchIndex = 0; // Initialize nextSearchIndex

// // // Define a function to handle the "Next" button click
// // const handleNextSearch = async () => {
// //     nextSearchIndex++; // Increment nextSearchIndex for the next search
// //     await performSearch(); // Call performSearch again for the next search
// // };

// // // Define the performSearch function
// // const performSearch = async () => {
    
// //     if (searchResults.length > 0) {
// //         const searchResult = searchResults[nextSearchIndex % searchResults.length]; // Get the next search result in a loop
// //         try {
// //             const response = await axios.get(searchResult);
// //             const html = response.data;
// //             const $ = cheerio.load(html);

// //             // Extract the heading
// //             const heading = $('h1').text(); // Assuming the heading is in an h1 tag

// //             let foundParagraph = ''; // Initialize an empty string to store the found paragraph
// //             let anchorLinks = []; // Initialize an array to store anchor links

// //             $('p').each((index, element) => {
// //                 const paragraphText = $(element).text().trim();
// //                 if (paragraphText.toLowerCase().includes(userInput.toLowerCase())) {
// //                     // Update the found paragraph
// //                     foundParagraph = paragraphText;
// //                     // Create anchor links for each occurrence of the search term in the paragraph
// //                     const regex = new RegExp(userInput, 'gi'); // Case-insensitive search
// //                     const matches = paragraphText.match(regex);
// //                     if (matches) {
// //                         matches.forEach(match => {
// //                             // Create anchor link and push to the array
// //                             const anchorLink = `<a href="${searchResult}#${match}" target="_blank">${match}</a>`;
                            
// //                         });
// //                     }
// //                     return false; // Exit the loop after finding the first matching paragraph
// //                 }
// //             });

// //             // Construct the bot response
// //             botResponse = {
// //                 author: 'bot',
// //                 body: (
// //                     <div>
// //                         <h4>{heading}</h4>
// //                         {foundParagraph && <p dangerouslySetInnerHTML={{ __html: foundParagraph }}></p>}
// //                         {anchorLinks.map((link, index) => (
// //                             <p key={index} dangerouslySetInnerHTML={{ __html: link }}></p>
// //                         ))}
// //                         <button><a href={searchResult} target="_blank">Read more</a></button> {/* Provide a link to the full content */}
// //                         <button onClick={handleNextSearch}>Something Else</button> {/* Option for next search */}
// //                     </div>
// //                 ),
// //                 timeout: 0
// //             };
// //               if (searchResults.length > 0) {
// //                 botResponse = {
// //                     author: 'bot',
// //                     body: `Found ${searchResults.length} results for "${userInput}":\n${searchResults.join('\n')}`,
// //                     timeout: 0
// //                 };
// //             } else {
// //                 botResponse = {
// //                     author: 'bot',
// //                     body: `Sorry, "${userInput}" was not found on any of the provided websites.`,
// //                     timeout: 0
// //                 };
// //             }
// //         } catch (error) {
// //             console.error('Error occurred while fetching or parsing HTML:', error);
// //             botResponse = {
// //                 author: 'bot',
// //                 body: `Error occurred while fetching or parsing HTML for "${userInput}"`,
// //                 timeout: 0
// //             };
// //         }
// //     } else {
// //         botResponse = {
// //             author: 'bot',
// //             body: `Sorry, "${userInput}" was not found on the website.`,
// //             timeout: 0
// //         };
// //     }
// // };


// // // Initial call to perform the search
// // await performSearch();




// export default webscrapper;