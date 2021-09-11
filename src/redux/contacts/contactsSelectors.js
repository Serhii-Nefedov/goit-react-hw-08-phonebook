import { createSelector } from "@reduxjs/toolkit";

const getContacts = (state) => state.contacts.contactsList;
const getFilter = (state) => state.contacts.filter;
const isLoading = (state) => state.contacts.isLoading;
const error = (state) => state.contacts.error;

const getFilteredContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    if (contacts && filter) {
      const normalizedFilter = filter.toLowerCase();
      const filteredContact = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );

      return filteredContact;
    }
    return contacts;
  }
);

export { getContacts, getFilter, getFilteredContacts, isLoading, error };