export enum userActionTypes {
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
}

type userAction = UserFetchAction | FetchingErrorAction;

let defaultState: IFetch = {
  users: [],
  error: "",
};
export interface IUser {
  login: string;
  password: string;
  isLogged: boolean;
}
export interface IFetch {
  users: IUser[];
  error: string;
}
interface UserFetchAction {
  type: userActionTypes.FETCH_SUCCESS;
  payload: IUser[];
}

interface FetchingErrorAction {
  type: userActionTypes.FETCH_ERROR;
  payload: string;
}
export default function usersReducer(state = defaultState, action: userAction) {
  switch (action.type) {
    case userActionTypes.FETCH_SUCCESS:
      return (defaultState = {
        ...state,
        users: action.payload,
      });
    case userActionTypes.FETCH_ERROR:
      return (defaultState = {
        ...state,
        error: action.payload,
      });
    default:
      return state;
  }
}
