// Importing createSlice utility from Redux Toolkit for easier slice creation
import { createSlice } from "@reduxjs/toolkit";

// Creating a slice to manage search-related state in the application
export const searchSlice = createSlice({
  name: "search", // Name of the slice (used as key in the store)
  initialState: {
    user: null,        // Stores user data from search results
    platforms: [],     // Stores coding platforms data related to the searched user
    heatmaps: [],      // Stores heatmap data for searched user/platforms
    isFetching: false, // Indicates whether a search or fetch operation is in progress
    error: false,      // Indicates whether the last operation resulted in an error
  },
  reducers: {
    /**
     * Triggered when a search operation begins
     * Sets isFetching flag to true for loading states
     */
    searchStart: (state) => {
      state.isFetching = true;
    },

    /**
     * Triggered when search is successful
     * Updates user data and resets loading and error flags
     */
    searchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.user = action.payload.user;
    },

    /**
     * Triggered when coding platforms data is successfully fetched
     * Updates platforms array and resets loading/error flags
     */
    platformsFetchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.platforms = action.payload.platforms;
    },

    /**
     * Triggered when heatmap data is successfully fetched
     * Updates heatmaps array (note: expects heatmaps in `action.payload.platforms`)
     */
    heatmapsFetchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.heatmaps = action.payload.platforms;
    },

    /**
     * Triggered when any search-related operation fails
     * Sets error flag and resets loading flag
     */
    searchFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    /**
     * Clears the entire search-related state
     * Useful when switching users or clearing the form
     */
    clearsearch: (state) => {
      state.isFetching = false;
      state.error = false;
      state.user = null;
      state.platforms = [];
      state.heatmaps = [];
    },
  },
});

// Exporting actions to be used in components or thunks
export const {
  searchStart,
  searchFailure,
  searchSuccess,
  platformSetSuccess, // NOTE: This action doesn't exist in the reducers above
  platformsFetchSuccess,
  heatmapsFetchSuccess,
  clearsearch,
} = searchSlice.actions;

// Exporting the reducer function to be added to the Redux store
export default searchSlice.reducer;
