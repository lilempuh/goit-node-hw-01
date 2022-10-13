const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex((item) => item.id === contactId);
  if (contactIdx === -1) {
    return null;
  }
  const removeProdact = contacts.filter((_, index) => index !== contactIdx);
  await fs.writeFile(contactsPath, JSON.stringify(removeProdact));
  return contacts[contactIdx];
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
