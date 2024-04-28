import { Provider } from "react-redux";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import store from "./components/store/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
