import React, { useReducer } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Get Contact
  const getContacts = async (contact) => {
    //contact.id = uuid;

    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };

    try {
      const res = await axios.get('/api/contacts');
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };

  //ADD Contact

  const addContact = async (contact) => {
    //contact.id = uuid;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };

  //Update Current Contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };

  //Delete Contact

  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };

  //Set Current Contact

  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };

  //Clear Contact

  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS,
    });
  };

  //Clear Current Contact

  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  //Filter Contacts
  const filterContact = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };

  //Clear Filter

  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        getContacts,
        clearContacts,
        updateContact,
        loading: state.loading,
        filtered: state.filtered,
        error: state.error,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
