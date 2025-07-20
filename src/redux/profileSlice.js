// Importing Redux Toolkit's createSlice utility to manage Redux state
import { createSlice } from "@reduxjs/toolkit";

// Creating a Redux slice for handling user profile-related state
export const profileSlice = createSlice({
  name: "profile", // Name of the slice
  initialState: {
    user: null,        // Holds user profile info
    platforms: [],     // Holds user's platforms
    heatmaps: [],      // Holds heatmap data for platforms
    isFetching: false, // Indicates if data is being fetched
    error: false,      // Indicates if there was an error in an operation
  },
  reducers: {
    /**
     * Called when a profile-related request starts
     * Sets loading state to true
     */
    profileStart: (state) => {
      state.isFetching = true;
    },

    /**
     * Called when user profile data is fetched successfully
     * Updates user data and resets error/loading flags
     */
    profileSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.user = action.payload.user;
    },

    /**
     * Called when platform update or set operation succeeds
     * Doesn't modify platforms list but resets error/loading flags
     */
    platformSetSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },

    /**
     * Called when all platforms are successfully fetched
     * Stores platforms in state and resets error/loading flags
     */
    platformsFetchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.platforms = action.payload.platforms;
    },

    /**
     * Called when heatmaps for platforms are successfully fetched
     * Stores heatmaps (reusing `platforms` key in payload) and resets error/loading flags
     */
    heatmapsFetchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      console.log("huuu", action.payload.platforms); // Debug log
      state.heatmaps = action.payload.platforms;
    },

    /**
     * Called when any profile-related request fails
     * Resets loading flag and sets error state
     */
    profileFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    /**
     * Resets the profile state to its initial values
     * Useful during logout or account deletion
     */
    clearProfile: (state) => {
      state.isFetching = false;
      state.error = false;
      state.user = null;
      state.platforms = [];
      state.heatmaps = [];
    },
  },
});

// Exporting all actions to be used in components or async functions
export const {
  profileStart,
  profileFailure,
  profileSuccess,
  platformSetSuccess,
  platformsFetchSuccess,
  heatmapsFetchSuccess,
  clearProfile,
} = profileSlice.actions;

// Exporting the reducer to be added to the store
export default profileSlice.reducer;
