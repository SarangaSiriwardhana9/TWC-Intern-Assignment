import express from 'express';
import { addContact, updateContact, deleteContact, getAllContacts } from '../controllers/contact.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Middleware to verify JWT token
router.use(verifyToken);

// Routes
router.post('/addContact', addContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);
router.get('/', getAllContacts);

export default router;
