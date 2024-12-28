// @ts-nocheck

import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
// import { MultiStepFormEnhanced } from "./App1";
import { ExampleForm } from "./newcode/Dick";
import ManageOwnerForm from "./newcode/Owner";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* <MultiStepFormEnhanced /> */}
    {/* <ExampleForm/> */}
    <ManageOwnerForm />
  </React.StrictMode>
);

