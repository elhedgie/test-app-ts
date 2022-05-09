import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import usersReducer from "./usersReducer";
import itemsReducer from "./contactsReducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  login: loginReducer,
  users: usersReducer,
  contacts: itemsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
