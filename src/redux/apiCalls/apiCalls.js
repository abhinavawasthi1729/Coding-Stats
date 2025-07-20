// Import toast notifications for user feedback
import { toast } from "react-toastify";

// Import Axios instances for public and authenticated requests
import { publicRequest, userRequest } from "../../requestMethods";

// Import Redux actions for updating user state
import {
  deleteUserSuccess,
  loginSuccess,
  updateSuccess,
  userFailure,
  userStart,
} from "../userSlice";

/**
 * Logs a user into the website.
 * @param {Function} dispatch - Redux dispatch function
 * @param {Object} user - Object containing username and password
 */
export const login = async (dispatch, user) => {
  // Dispatch action to indicate login process has started
  dispatch(userStart());
  try {
    // Send login request to the backend
    const res = await publicRequest.post("/user/login", user);
    // If successful, update Redux state and show success toast
    dispatch(loginSuccess(res.data));
    toast("Logged In Successfully!");
  } catch (error) {
    // If failed, update state with error and show error toast
    dispatch(userFailure(error?.response?.data?.message));
    toast(error?.response?.data?.message);
  }
};

/**
 * Registers a new user and logs them in immediately after registration.
 * @param {Function} dispatch - Redux dispatch function
 * @param {Object} user - New user data (username, password, etc.)
 */
export const signup = async (dispatch, user) => {
  dispatch(userStart());
  try {
    // Send signup request to backend
    const res = await publicRequest.post("/user/signup", user);
    // Notify user of successful registration
    toast("User Registered!");
    // Auto-login the user after successful registration
    login(dispatch, { username: user.username, password: user.password });
  } catch (error) {
    // If failed, update Redux state and show error toast
    dispatch(userFailure(error?.response?.data?.message));
    toast(error?.response?.data?.message);
  }
};

/**
 * Updates the user's password.
 * @param {Function} dispatch - Redux dispatch function
 * @param {Object} passwords - Object containing current and new passwords
 */
export const updatePassword = async (dispatch, passwords) => {
  dispatch(userStart());
  try {
    // Send request to update password
    const res = await userRequest.patch("/user/updateMyPassword", {
      ...passwords,
    });
    // Update Redux state and show success toast
    dispatch(updateSuccess(res.data));
    toast("Password updated Successfully!");
  } catch (error) {
    // On error, update Redux state and show error message
    dispatch(userFailure(error?.response?.data?.message));
    toast(error?.response?.data?.message);
  }
};

/**
 * Deletes the currently logged-in user account.
 * @param {Function} dispatch - Redux dispatch function
 * @param {String} password - User's password for confirmation
 */
export const deleteUser = async (dispatch, password) => {
  dispatch(userStart());
  try {
    // Send delete request with password confirmation
    const res = await userRequest.post("/user/deleteMe", {
      password: password,
    });
    // Show success toast and remove user from Redux state
    toast("Your account has been deleted");
    dispatch(deleteUserSuccess());
  } catch (error) {
    // On failure, update Redux and show error toast
    dispatch(userFailure(error?.response?.data?.message));
    toast(error?.response?.data?.message);
  }
};
