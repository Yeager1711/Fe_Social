// server.js (or your Express setup file)
const express = require('express');
const sendExamEndEmail = require('./emailService'); // Import the email service
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Endpoint to trigger email
app.post('/api/sendExamEndEmail', async (req, res) => {
    const { email } = req.body; // Get the email from the request body

    try {
        await sendExamEndEmail(email); // Call the email function
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
