// @ts-nocheck

import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { ExampleForm } from "../old code/WorkingSample";
import ManageOwnerForm from "./newcode/Owner";
import GooglePlacesSelect from "../old code/GooglePlacesSelect";
import ParentComponent from "../old code/Parent";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* <MultiStepFormEnhanced /> */}
    {/* <ExampleForm/> */}
    {/* <ManageOwnerForm /> */}
    {/* <GooglePlacesSelect/> */}
    <ParentComponent/>
  </React.StrictMode>
);

