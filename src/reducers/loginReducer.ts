export enum loginActionTypes {
  AUTH_LOGIN = "AUTH_LOGIN",
  AUTH_FAIL = "AUTH_FAIL",
  AUTH_LOGOUT = "AUTH_LOGOUT",
}

let defaultState: ILogin = {
  id: null,
  login: null,
  password: null,
  isLogged: false,
  error: "",
};

interface ActionLogin {
  type: loginActionTypes.AUTH_LOGIN;
  payload: ILogin;
}

interface ActionLoginFailed {
  type: loginActionTypes.AUTH_FAIL;
  payload: string;
}

interface ActionLogout {
  type: loginActionTypes.AUTH_LOGOUT;
  payload: ILogin;
}

export interface ILogin {
  id: null | string;
  login: null | string;
  password: null | string;
  isLogged: boolean;
  error: string;
}
type LoginAction = ActionLogin | ActionLoginFailed | ActionLogout;

export default function loginReducer(
  state = defaultState,
  action: LoginAction
): ILogin {
  switch (action.type) {
    case loginActionTypes.AUTH_LOGIN:
      return (defaultState = {
        ...defaultState,
        id: action.payload.id,
        login: action.payload.login,
        password: action.payload.password,
        isLogged: !action.payload.isLogged,
      });
    case loginActionTypes.AUTH_FAIL:
      return { ...defaultState, error: action.payload };
    case loginActionTypes.AUTH_LOGOUT:
      return (defaultState = {
        ...defaultState,
        login: null,
        password: null,
        isLogged: false,
      });
    default:
      return state;
  }
}
