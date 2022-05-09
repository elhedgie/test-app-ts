export enum contactActionTypes {
  FETCH_CONTACT = "FETCH_CONTACT",
  LOADING_CONTACT = "LOADING_CONTACT",
  FETCH_CONTACT_FAILED = "FETCH_CONTACT_FAILED",
  ADD_CONTACT = "ADD_CONTACT",
  SEARCH_CONTACT = "SEARCH_CONTACT",
  DELETE_CONTACT = "DELETE_CONTACT",
}

interface contactFetchAction {
  type: contactActionTypes.FETCH_CONTACT;
  payload: { loading: boolean; contacts: IContact[] };
}

interface contactFetchFailedAction {
  type: contactActionTypes.FETCH_CONTACT_FAILED;
  payload: string;
}
interface contactAddAction {
  type: contactActionTypes.ADD_CONTACT;
  payload: IContact;
}
interface contactLoadingAction {
  type: contactActionTypes.LOADING_CONTACT;
  payload: boolean;
}
interface contactDeleteAction {
  type: contactActionTypes.DELETE_CONTACT;
  payload: IContact[];
}
interface contactSearchAction {
  type: contactActionTypes.SEARCH_CONTACT;
  payload: IContact[];
}
export type contactAction =
  | contactAddAction
  | contactDeleteAction
  | contactSearchAction
  | contactFetchAction
  | contactLoadingAction
  | contactFetchFailedAction;

export interface IContact {
  id: string;
  name: string;
  phone: string;
}

interface IContactsFetch {
  contacts: IContact[];
  loading: boolean;
  error: string;
}

let defaultState: IContactsFetch = {
  contacts: [],
  loading: false,
  error: "",
};
export default function itemsReducer(
  state = defaultState,
  action: contactAction
): IContactsFetch {
  switch (action.type) {
    case contactActionTypes.FETCH_CONTACT:
      return (state = {
        ...state,
        loading: action.payload.loading,
        contacts: action.payload.contacts,
      });
    case contactActionTypes.LOADING_CONTACT:
      return (state = { ...state, loading: action.payload });
    case contactActionTypes.FETCH_CONTACT_FAILED:
      return (state = { ...state, error: action.payload });
    case contactActionTypes.ADD_CONTACT:
      return (state = {
        ...state,
        contacts: [...state.contacts, action.payload],
      });
    case contactActionTypes.SEARCH_CONTACT:
      return { ...state, contacts: action.payload };
    case contactActionTypes.DELETE_CONTACT:
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
}
