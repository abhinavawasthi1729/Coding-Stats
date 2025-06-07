import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    user: null,
    platforms: [],
    heatmaps: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // Reducer for starting a search operation
    searchStart: (state) => {
      state.isFetching = true;
    },
    // Reducer for successful search operation
    searchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.user = action.payload.user;
    },
    // Reducer for successful fetch of coding platforms data
    platformsFetchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.platforms = action.payload.platforms;
    },
    // Reducer for successful fetch of heatmaps data
    heatmapsFetchSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.heatmaps = action.payload.platforms;
    },
     // Reducer for search failure
    searchFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
        // Reducer for clearing search-related state

    clearsearch: (state) => {
      state.isFetching = false;
      state.error = false;
      state.user = null;
      state.platforms = [];
      state.heatmaps = [];
    },
  },
});

export const {
  searchStart,
  searchFailure,
  searchSuccess,
  platformSetSuccess,
  platformsFetchSuccess,
  heatmapsFetchSuccess,
  clearsearch,
} = searchSlice.actions;
export default searchSlice.reducer;
