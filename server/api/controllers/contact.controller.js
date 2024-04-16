import Contact from '../models/contact.model.js';
import { errorHandler } from '../utils/error.js';

// Add a new contact
export const addContact = async (req, res, next) => {
  const { fullName, email, phoneNumber, gender } = req.body;
  const userId = req.user.id; 

  try {
    const newContact = new Contact({
      fullName,
      email,
      phoneNumber,
      gender,
      user: userId
    });

    await newContact.save();
    res.status(201).json({ message: 'Contact added successfully!', contact: newContact });
  } catch (error) {
    next(error);
  }
};

// Update a contact
export const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { fullName, email, phoneNumber, gender } = req.body;
  const userId = req.user.id; 

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, user: userId },
      { fullName, email, phoneNumber, gender },
      { new: true }
    );

    if (!updatedContact) {
      return next(errorHandler(404, 'Contact not found!'));
    }

    res.status(200).json({ message: 'Contact updated successfully!', contact: updatedContact });
  } catch (error) {
    next(error);
  }
};

// Delete a contact
export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id; 

  try {
    const deletedContact = await Contact.findOneAndDelete({ _id: id, user: userId });

    if (!deletedContact) {
      return next(errorHandler(404, 'Contact not found!'));
    }

    res.status(200).json({ message: 'Contact deleted successfully!' });
  } catch (error) {
    next(error);
  }
};

// Get all contacts
export const getAllContacts = async (req, res, next) => {
  const userId = req.user.id; 

  try {
    const contacts = await Contact.find({ user: userId });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
