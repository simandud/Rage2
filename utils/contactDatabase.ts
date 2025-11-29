/**
 * Simple Contact Database using LocalStorage
 * Stores contact information from newsletter signups and contact forms
 */

export interface Contact {
  id: string;
  email: string;
  name?: string;
  message?: string;
  type: 'newsletter' | 'contact' | 'event' | 'class' | 'rental';
  timestamp: number;
  metadata?: {
    eventId?: number;
    classId?: number;
    productId?: number;
    [key: string]: any;
  };
}

const DB_KEY = 'rage_venture_contacts';

/**
 * Get all contacts from the database
 */
export const getAllContacts = (): Contact[] => {
  try {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading contacts from database:', error);
    return [];
  }
};

/**
 * Add a new contact to the database
 */
export const addContact = (contact: Omit<Contact, 'id' | 'timestamp'>): Contact => {
  try {
    const contacts = getAllContacts();
    const newContact: Contact = {
      ...contact,
      id: generateId(),
      timestamp: Date.now()
    };

    contacts.push(newContact);
    localStorage.setItem(DB_KEY, JSON.stringify(contacts));

    return newContact;
  } catch (error) {
    console.error('Error adding contact to database:', error);
    throw error;
  }
};

/**
 * Get contacts by type
 */
export const getContactsByType = (type: Contact['type']): Contact[] => {
  const contacts = getAllContacts();
  return contacts.filter(contact => contact.type === type);
};

/**
 * Get contacts by email
 */
export const getContactsByEmail = (email: string): Contact[] => {
  const contacts = getAllContacts();
  return contacts.filter(contact => contact.email.toLowerCase() === email.toLowerCase());
};

/**
 * Check if email exists in database
 */
export const emailExists = (email: string): boolean => {
  const contacts = getAllContacts();
  return contacts.some(contact => contact.email.toLowerCase() === email.toLowerCase());
};

/**
 * Delete a contact by ID
 */
export const deleteContact = (id: string): boolean => {
  try {
    const contacts = getAllContacts();
    const filteredContacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem(DB_KEY, JSON.stringify(filteredContacts));
    return true;
  } catch (error) {
    console.error('Error deleting contact:', error);
    return false;
  }
};

/**
 * Clear all contacts (for testing/admin)
 */
export const clearAllContacts = (): void => {
  try {
    localStorage.removeItem(DB_KEY);
  } catch (error) {
    console.error('Error clearing contacts:', error);
  }
};

/**
 * Export contacts as JSON
 */
export const exportContacts = (): string => {
  const contacts = getAllContacts();
  return JSON.stringify(contacts, null, 2);
};

/**
 * Get contact statistics
 */
export const getContactStats = () => {
  const contacts = getAllContacts();

  return {
    total: contacts.length,
    byType: {
      newsletter: contacts.filter(c => c.type === 'newsletter').length,
      contact: contacts.filter(c => c.type === 'contact').length,
      event: contacts.filter(c => c.type === 'event').length,
      class: contacts.filter(c => c.type === 'class').length,
      rental: contacts.filter(c => c.type === 'rental').length,
    },
    recent: contacts.slice(-10).reverse()
  };
};

/**
 * Generate a unique ID
 */
const generateId = (): string => {
  return `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Hook for newsletter signup
 */
export const subscribeNewsletter = (email: string, name?: string): Promise<Contact> => {
  return new Promise((resolve, reject) => {
    try {
      if (!isValidEmail(email)) {
        reject(new Error('Email inválido'));
        return;
      }

      if (emailExists(email)) {
        reject(new Error('Este email ya está suscrito'));
        return;
      }

      const contact = addContact({
        email,
        name,
        type: 'newsletter'
      });

      // Simulate API delay
      setTimeout(() => {
        resolve(contact);
      }, 1000);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Hook for contact form submission
 */
export const submitContactForm = (
  email: string,
  name: string,
  message: string
): Promise<Contact> => {
  return new Promise((resolve, reject) => {
    try {
      if (!isValidEmail(email)) {
        reject(new Error('Email inválido'));
        return;
      }

      if (!name || name.trim().length < 2) {
        reject(new Error('Nombre inválido'));
        return;
      }

      if (!message || message.trim().length < 10) {
        reject(new Error('El mensaje debe tener al menos 10 caracteres'));
        return;
      }

      const contact = addContact({
        email,
        name,
        message,
        type: 'contact'
      });

      // Simulate API delay
      setTimeout(() => {
        resolve(contact);
      }, 1500);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Email validation helper
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
