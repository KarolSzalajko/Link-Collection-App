import UsersApi from "../Api/UsersApi";
import Dispatcher from "../Infrastructure/Dispatcher";
import ActionTypes from "./ActionTypes";

export async function loadUsers() {
  let users = await UsersApi.getUsers();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_USERS,
    payload: { users: users },
  });
}

export async function loadCurrentUser() {
  let user = await UsersApi.getCurrentUser();
  Dispatcher.dispatch({
    actionType: ActionTypes.LOAD_CURRENT_USER,
    payload: { user: user },
  });
}
