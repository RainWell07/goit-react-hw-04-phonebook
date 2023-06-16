import React, { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import Filter from "../components/Filter";
import { nanoid } from "nanoid";
import css from "../Modules/phoneBook.module.css";

const App = () => {
  
  const localContacts = JSON.parse(localStorage.getItem('contacts'));
  const [contacts, setContacts] = useState(localContacts ?? []);
  const [filter, setFilter] = useState('');


 useEffect(() => {
   localStorage.setItem('contacts', JSON.stringify(contacts));
 },[contacts]);


 const addContact = (newContact) => {
  if (contacts.some((contact) => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
    alert(`${newContact.name} is already in contacts.`);
    return;
  }
  const id = nanoid();
  const contactWithId = { ...newContact, id };
  setContacts([...contacts, contactWithId]);
};

const deleteContact = (id) => {
  setContacts(contacts.filter((contact) => contact.id !== id));
};


  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={`${css.container} ${css.basicFont}`}>
        <h1 className={`${css.basicFont} ${css.logo}`}>Phonebook</h1>
        <ContactForm addContact={addContact} />
        <h2 className={`${css.basicFont} ${css.logo}`}>Contacts</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
      </div>
    );

}

export default App;
