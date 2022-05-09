import { IContact, contactActionTypes } from "../contactsReducer";
import { loginActionTypes } from "../loginReducer";
import { IFetch, userActionTypes } from "../usersReducer";

export const fetchingUsers = (users: IFetch[]) => {
  return { type: userActionTypes.FETCH_SUCCESS, payload: users };
};

export const fetchingUsersFailed = (error: string) => {
  return { type: userActionTypes.FETCH_ERROR, payload: error };
};

export const logInSuccessful = ({
  login,
  password,
  isLogged,
}: {
  login: string;
  password: string;
  isLogged: boolean;
}) => {
  return {
    type: loginActionTypes.AUTH_LOGIN,
    payload: { login: login, password: password, isLogged: isLogged },
  };
};

export const logOut = () => {
  return { type: loginActionTypes.AUTH_LOGOUT };
};

export const logInFailed = (error: string) => {
  return { type: loginActionTypes.AUTH_FAIL, payload: error };
};

export const addContactAction = (contacts: IContact) => {
  return { type: contactActionTypes.ADD_CONTACT, payload: contacts };
};
export const fetchContactAction = (loading: false, contacts: IContact[]) => {
  return {
    type: contactActionTypes.FETCH_CONTACT,
    payload: { loading: loading, contacts: contacts },
  };
};

export const deleteContactAction = (contacts: IContact[]) => {
  return { type: contactActionTypes.DELETE_CONTACT, payload: contacts };
};

export const loadingContact = (loading: boolean) => {
  return { type: contactActionTypes.LOADING_CONTACT, payload: loading };
};
export const fetchContactFailed = (error: string) => {
  return { type: contactActionTypes.FETCH_CONTACT_FAILED, payload: error };
};
