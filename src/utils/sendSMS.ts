import twilio from 'twilio';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Twilio client with your Twilio SID and Auth Token from environment variables
const client = twilio(process.env.TWILIO_SID!, process.env.TWILIO_AUTH_TOKEN!);

// Function to send SMS using Twilio
export const sendSMS = async (phoneNumber: string, message: string): Promise<void> => {
  try {
    // Check if the message length exceeds the 1600 character limit
    const maxLength = 1600;
    if (message.length > maxLength) {
      // Split the message into smaller parts if necessary
      const messageParts = message.match(new RegExp(`.{1,${maxLength}}`, 'g'));

      for (let part of messageParts!) {
        const messageSent = await client.messages.create({
          body: part,
          to: phoneNumber, // The recipient's phone number
          from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
        });
        console.log(`Message part sent successfully: ${messageSent.sid}`);
      }
    } else {
      // Send the message if it's within the limit
      const messageSent = await client.messages.create({
        body: message,
        to: phoneNumber, // The recipient's phone number
        from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      });
      console.log(`Message sent successfully: ${messageSent.sid}`);
    }
  } catch (error: any) {
    console.error('Error sending SMS:', error.message);
    throw new Error('Error sending SMS');
  }
};
