import axios from "axios";
import { AppDispatch } from "../reducers";
import {
  fetchContactAction,
  fetchContactFailed,
  loadingContact,
} from "../reducers/Action Creators/action creators";

export default function fetchContacts(dispatch: AppDispatch) {
  dispatch(loadingContact(true));
  setTimeout(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.data)
      .then((json) => dispatch(fetchContactAction(false, json)))
      .catch((error) => dispatch(fetchContactFailed(error.message)));
  }, 500);
}
