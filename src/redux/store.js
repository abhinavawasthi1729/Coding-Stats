// Import core functions from Redux Toolkit
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Import individual slice reducers
import userReducer from "./userSlice";
import profileReducer from "./profileSlice";
import searchSlice from "./searchSlice";

// Import Redux Persist tools for persisting store state
import {
  persistStore,       // Creates a persistor object linked to the store
  persistReducer,     // Wraps root reducer with persistence capability
  FLUSH,              // Redux Persist internal action types
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Import default web storage (localStorage) for persisting state
import storage from "redux-persist/lib/storage";

// Configuration for Redux Persist
const persistConfig = {
  key: "root",     // Key for persisted root in storage
  version: 1,      // Version number for future migration handling
  storage,         // Storage engine to use (here: localStorage)
};

// Combine individual slice reducers into a root reducer
const rootReducer = combineReducers({
  user: userReducer,         // Handles user authentication/login state
  profile: profileReducer,   // Handles user's profile and history
  search: searchSlice,       // Handles search, platform, and heatmap data
});

// Create a persisted reducer by wrapping the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store using Redux Toolkit's configureStore
export const store = configureStore({
  reducer: persistedReducer,  // Use persisted root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Ignore Redux Persist internal actions for serializable checks
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor object for use with <PersistGate> in React
export const persistor = persistStore(store);
