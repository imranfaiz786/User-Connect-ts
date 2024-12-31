import Connect from '../models/connect.model';
import { generateQRCode } from '../utils/generateQRCode';
import { sendEmail } from '../utils/sendEmail';
import { sendSMS } from '../utils/sendSMS';

// Define the type for the data argument in createConnect
interface ConnectData {
  name: string;
  email: string;
  phoneNumber: string;
}

// Service to create a new user connection
export const createConnect = async (data: ConnectData) => {
  try {
    // Validate required fields
    if (!data.name || !data.email || !data.phoneNumber) {
      throw new Error('Missing required user data');
    }

    // Generate QR code for the user using their email
    const qrCode = await generateQRCode(data.email);

    // Create the user connection link
    const link = `http://localhost:3000/connect/${data.email}`;

    // Create and save the user connection to the database
    const newConnect = new Connect({
      ...data,
      qrCode,
      link,
    });

    // Return the saved user connection document
    return await newConnect.save();
  } catch (error: unknown) {
    handleError(error, 'Error creating connection');
  }
};

// Service to send an invitation to the user via email or SMS
export const sendInvitation = async (id: string, method: 'email' | 'sms') => {
  try {
    // Find the user connection by ID
    const userConnect = await Connect.findById(id);
    if (!userConnect) throw new Error('User connection not found');

    // Construct the invitation message
    const message = `Hello ${userConnect.name},\nYou are invited to connect! Your QR Code: ${userConnect.qrCode}\nLink: ${userConnect.link}`;

    // Send the invitation via the chosen method
    if (method === 'email') {
      await sendEmail(userConnect.email, message);
    } else if (method === 'sms') {
      await sendSMS(userConnect.phoneNumber, message);
    } else {
      throw new Error('Invalid method');
    }
  } catch (error: unknown) {
    handleError(error, 'Error sending invitation');
  }
};

// Service to get a user connection by ID
export const getConnect = async (id: string) => {
  try {
    // Find the user connection by ID
    const userConnect = await Connect.findById(id);
    if (!userConnect) throw new Error('User connection not found');
    return userConnect;
  } catch (error: unknown) {
    handleError(error, 'Error fetching user connection');
  }
};

// Service to get all user connections
export const getAllConnects = async () => {
  try {
    // Retrieve all user connections from the database
    const allConnects = await Connect.find();
    return allConnects;
  } catch (error: unknown) {
    handleError(error, 'Error fetching all user connections');
  }
};

// Common error handling function
const handleError = (error: unknown, customMessage: string) => {
  if (error instanceof Error) {
    throw new Error(`${customMessage}: ${error.message}`);
  } else {
    throw new Error(`${customMessage}: An unknown error occurred`);
  }
};
