const express = require('express');
const bodyParser = require('body-parser');
const { NlpManager } = require('node-nlp');
const http = require("http");
const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);
const cors = require("cors");

app.use(cors());

const socket = require("socket.io");
const { Configuration, OpenAIApi } = require("openai");

// Your CORS setup

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Declare and initialize the manager variable
const manager = new NlpManager({ languages: ['en'] });
manager.load(); // Load your NLP model here

// Route handler for handling POST requests
app.post('/api/chatbot', async (req, res, next) => {
    try {
        console.log("Payload from client:", req.body);
        const { message } = req.body;
        const response = await manager.process('en', message);
        res.json({ answer: response.answer });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(3001, () => {
    console.log('Backend server is running on port 3001');
});
