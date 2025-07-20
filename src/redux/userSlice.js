// Import the function to create a Redux slice
import { createSlice } from "@reduxjs/toolkit";

// Create a slice for user-related state
export const userSlice = createSlice({
  name: "user",  // Slice name
  initialState: {
    currentUser: null,     // Stores current logged-in user object
    isFetching: false,     // Indicates if an async user operation is in progress
    error: false,          // Flags an error occurred in user operations
    errorMsg: null,        // Stores specific error message
    dark: true,            // User preference for dark mode theme
  },
  reducers: {
    // Called when any user-related async operation starts
    userStart: (state) => {
      state.isFetching = true;
    },

    // Called when login is successful
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.errorMsg = null;
      state.currentUser = action.payload;  // Set logged-in user data
    },

    // Called when user profile update is successful
    updateSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.errorMsg = null;
      state.currentUser = action.payload;  // Update user data
    },

    // Called when user logs out successfully
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = null;    // Clear user data
      state.errorMsg = null;
    },

    // Resets error flags and messages (can be used before retries or page changes)
    errorReset: (state) => {
      state.isFetching = false;
      state.error = false;
      state.errorMsg = null;
    },

    // Called when user is successfully deleted
    deleteUserSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = null;  // Clear user data
      state.errorMsg = null;
    },

    // Called when a user operation fails
    userFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMsg = action.payload;  // Store error message
    },

    // Forcefully logs out the user (useful during session expiration or manual logout)
    logOut: (state) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = null;
      state.errorMsg = null;
    },

    // Toggle or set user theme preference (dark/light mode)
    changeUserTheme: (state, action) => {
      state.isFetching = false;
      state.dark = action.payload;  // true = dark mode, false = light mode
      state.error = false;
    },
  },
});

// Export actions for use in components or thunks
export const {
  userStart,
  loginSuccess,
  deleteUserSuccess,
  logoutSuccess,
  updateSuccess,
  userFailure,
  errorReset,
  logOut,
  changeUserTheme,
} = userSlice.actions;

// Export the reducer to be added to the store
export default userSlice.reducer;
