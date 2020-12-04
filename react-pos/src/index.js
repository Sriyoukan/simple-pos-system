import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./../src/js/components/Header";
import Login from "./js/components/Login"

import App from "./App";
import { Switch } from "@material-ui/core";


render(
  <BrowserRouter>
    <App />
    </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
