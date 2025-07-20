// Import React core libraries
import React from "react";
import ReactDOM from "react-dom/client";

// Import main App component
import App from "./App.jsx";

// Redux setup
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";

// Enables persisted Redux state across reloads
import { PersistGate } from "redux-persist/integration/react";

// Render the App wrapped in Redux Provider and PersistGate
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> {/* Provide Redux store to the app */}
      <PersistGate loading={null} persistor={persistor}> {/* Wait for persisted state before rendering */}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
