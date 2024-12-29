import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import ParentComponent from "./newcode/Parent";
const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ParentComponent/>
  </React.StrictMode>
);

