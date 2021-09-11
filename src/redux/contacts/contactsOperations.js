
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

export const DB_fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/contacts");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const DB_postContact = createAsyncThunk(
  "contacts/postContact",
  async ({ name, number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/contacts", {
        name: `${name}`,
        number: `${number}`,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const DB_deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addContact = createAction(
  "contactsList/addContact",
  ({ name, number }) => ({
    payload: {
      id: uuidv4(),
      name: name,
      number: number,
    },
  })
);

export const deleteContact = createAction("contacts/deleteContact");
export const filterContacts = createAction("contacts/filterContacts");