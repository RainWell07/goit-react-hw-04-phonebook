import React, { Component } from "react";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import Filter from "../components/Filter";
import { nanoid } from "nanoid";
import css from "../Modules/phoneBook.module.css";

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    if (localContacts !== null) {
      this.setState({ contacts: JSON.parse(localContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    const prevContacts = prevState.contacts;
    if (contacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = (newContact) => {
    const { contacts } = this.state;
    if (contacts.some((contact) => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    const id = nanoid();
    const contactWithId = { ...newContact, id };
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contactWithId],
    }));
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  handleFilterChange = (value) => {
    this.setState({ filter: value });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={`${css.container} ${css.basicFont}`}>
        <h1 className={`${css.basicFont} ${css.logo}`}>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2 className={`${css.basicFont} ${css.logo}`}>Contacts</h2>
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} deleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default App;
