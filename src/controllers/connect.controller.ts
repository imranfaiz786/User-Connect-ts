import { Request, Response } from 'express';
import * as ConnectService from '../services/connect.services';

// Controller to create a new user connection
export const createConnect = async (req: Request, res: Response): Promise<void> => {
  const { name, email, phoneNumber } = req.body;

  // Validate required fields
  if (!name || !email || !phoneNumber) {
    res.status(400).json({ message: 'Name, email, and phone number are required' });
    return;
  }

  try {
    const userConnect = await ConnectService.createConnect(req.body);
    res.status(201).json(userConnect); // 201 status code for successful creation
  } catch (error: unknown) {
    console.error('Error creating user connection:', error); // Log the error for debugging
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error creating user connection', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred while creating user connection' });
    }
  }
};

// Controller to send an invitation to the user via email or SMS
export const sendInvitation = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { method } = req.body; // Method is either 'email' or 'sms'

  if (!method || (method !== 'email' && method !== 'sms')) {
    res.status(400).json({ message: "Method must be either 'email' or 'sms'" });
    return;
  }

  try {
    await ConnectService.sendInvitation(id, method);
    res.status(200).json({ message: 'Invitation sent successfully' });
  } catch (error: unknown) {
    console.error('Error sending invitation:', error); // Log the error for debugging
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error sending invitation', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred while sending the invitation' });
    }
  }
};

// Controller to get a specific user connection by ID
export const getConnectById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const userConnect = await ConnectService.getConnect(id);
    if (!userConnect) {
      res.status(404).json({ message: 'User connection not found' }); // 404 status code for not found
    } else {
      res.status(200).json(userConnect); // 200 status code for success
    }
  } catch (error: unknown) {
    console.error('Error fetching user connection by ID:', error); // Log the error for debugging
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching user connection', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred while fetching user connection' });
    }
  }
};

// Controller to get all user connections
export const getAllConnects = async (req: Request, res: Response): Promise<void> => {
  try {
    const allConnects = await ConnectService.getAllConnects();
    res.status(200).json(allConnects); // 200 status code for success
  } catch (error: unknown) {
    console.error('Error fetching all user connections:', error); // Log the error for debugging
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching all user connections', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred while fetching all user connections' });
    }
  }
};
