import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import { contactsOperations } from "redux/contacts";

const contactsReducer = createReducer([], {
  [contactsOperations.DB_fetchContacts.fulfilled]: (_, { payload }) => payload,
  [contactsOperations.addContact]: (state, { payload }) => [...state, payload],
  [contactsOperations.DB_postContact.fulfilled]: () => {},
  [contactsOperations.deleteContact]: (state, { payload }) =>
    state.filter((contact) => contact.id !== payload),
});

const filterReducer = createReducer("", {
  [contactsOperations.filterContacts]: (_, { payload }) => payload,
});

const isLoadingReducer = createReducer(false, {
  [contactsOperations.DB_fetchContacts.pending]: () => true,
  [contactsOperations.DB_fetchContacts.fulfilled]: () => false,
  [contactsOperations.DB_fetchContacts.rejected]: () => false,

  [contactsOperations.DB_postContact.pending]: () => true,
  [contactsOperations.DB_postContact.fulfilled]: () => false,
  [contactsOperations.DB_postContact.rejected]: () => false,

  [contactsOperations.DB_deleteContact.pending]: () => true,
  [contactsOperations.DB_deleteContact.fulfilled]: () => false,
  [contactsOperations.DB_deleteContact.rejected]: () => false,
});

const errorReducer = createReducer(null, {
  [contactsOperations.DB_fetchContacts.rejected]: (_, { payload }) => payload,
  [contactsOperations.DB_fetchContacts.pending]: () => null,

  [contactsOperations.DB_postContact.rejected]: (_, { payload }) => payload,
  [contactsOperations.DB_postContact.pending]: () => null,

  [contactsOperations.DB_deleteContact.rejected]: (_, { payload }) => payload,
  [contactsOperations.DB_deleteContact.pending]: () => null,
});

export const rootReducer = combineReducers({
  contactsList: contactsReducer,
  filter: filterReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,
});