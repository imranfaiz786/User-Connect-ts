// connect.routes.ts
import { Router } from 'express';
import { createConnect, sendInvitation, getConnectById, getAllConnects } from '../controllers/connect.controller';

// Create a new router instance
const router = Router();

// Route to create a new user connection
router.post('/create', createConnect);

// Route to send an invitation to a user
router.post('/:id/invite', sendInvitation);

// Route to get a specific user connection by ID
router.get('/:id', getConnectById);

// Route to get all user connections
router.get('/', getAllConnects);

// Export the router so it can be used in the main app
export default router;
