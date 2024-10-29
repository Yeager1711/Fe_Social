// emailService.js
const nodemailer = require('nodemailer');

const sendExamEndEmail = async (recipientEmail) => {
    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io', // Use Mailtrap for development/testing
        port: 2525, // Port for Mailtrap
        auth: {
            user: 'YOUR_MAILTRAP_USERNAME', // Replace with your Mailtrap username
            pass: 'YOUR_MAILTRAP_PASSWORD'  // Replace with your Mailtrap password
        }
    });

    // Email options
    const mailOptions = {
        from: '"Exam Notification" <noreply@example.com>', // Sender address
        to: recipientEmail, // Recipient address
        subject: 'Exam End Notification', // Subject line
        text: 'Bài thi của bạn đã kết thúc do vi phạm quy tắc thi.', // Plain text body
        html: '<p>Bài thi của bạn đã kết thúc do vi phạm quy tắc thi.</p>' // HTML body
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendExamEndEmail;
