import React, { useState } from 'react';
import './App.css'; // Import the CSS file

const ContactForm: React.FC = () => {
    const [showForm, setShowForm] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        

        const formData = new FormData(e.currentTarget);

        // Create an object to store form data
        const jsonData: { [key: string]: string } = {};

        // Loop through form data and populate jsonData
        formData.forEach((value, key) => {
            jsonData[key] = value as string;
        });

        let errors: { [key: string]: string } = {};

        if (!jsonData.name?.trim()) {
            errors.name = 'Name is required';
        }
        if (!jsonData.email?.trim()) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(jsonData.email)) {
            errors.email = 'Invalid email format';
        }
        if (!jsonData.message?.trim()) {
            errors.message = 'Message is required';
        }

        if (Object.keys(errors).length > 0) {
            console.log(errors);
            return;
        }

        // Send data to backend
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });
            if (response.ok) {
                console.log('Data submitted successfully');
                setFormSubmitted(true); // Set formSubmitted to true after successful submission
                setTimeout(() => setShowForm(false), 2000); // Close form after 2 seconds
            } else {
                console.error('Failed to submit data');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const handleClose = () => {
        // Handle close button click event
        setShowForm(false);
    };

    if (!showForm) {
        return null; // If showForm is false, return null to hide the form
    }

    return (
        <div className="form-container">
            <button className="close-button" onClick={handleClose}>Close</button>
            {!formSubmitted ? ( // Render the form if it has not been submitted
                <form onSubmit={handleSubmit}>
                    <html><h6> We’d love to hear from you!<br /><br />
                    Email: Sales – sales@codestoresolutions.com <br />
                    Enquiries – info@codestoresolutions.com <br />
                    Recruitment – hr@codestoresolutions.com <br /><br />
                    Phone: USA +1 (213) 814-4265 <br />
                    India +91 95997 20600</h6></html>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div className="success-message">Thanks for contacting, We typically respond to any inquiry within one business day</div>
            )}
        </div>
    );
};

export default ContactForm;
