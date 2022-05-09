import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "normalize.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./reducers";
import "normalize.css";

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
