import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import ParentComponent from "./newcode/Parent";
import { Provider } from 'react-redux';  // Import Provider from react-redux
import {store,  persistor } from "./newcode/store";
import { PersistGate } from "redux-persist/integration/react";
const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <ParentComponent/>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);