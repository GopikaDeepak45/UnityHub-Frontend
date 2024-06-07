import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>

  </Provider>
);

{/*

import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);*/}