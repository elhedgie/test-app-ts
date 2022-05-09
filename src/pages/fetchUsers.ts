import axios from "axios";
import { AppDispatch } from "../reducers";
import { fetchingUsers } from "../reducers/Action Creators/action creators";

export default function fetchUsers(dispatch: AppDispatch) {
  axios
    .get("http://localhost:3001/users")
    .then((res) => res.data.json())
    .then((json) => dispatch(fetchingUsers(json)))
    .catch((error) => console.log(error.message));
}
