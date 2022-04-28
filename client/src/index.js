import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";

import reducer from "./reducers";
import App from "./components/App";
import Welcome from "./components/Welcome";
import Signup from "./components/auth/Signup";
import Feature from "./components/Feature";
import RequireAuth from "./components/RequireAuth";
import Signout from "./components/auth/Signout";
import Signin from "./components/auth/Signin";

const preloadedState = {
  auth: {
    authenticated: localStorage.getItem("token"),
  },
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxThunk),
  preloadedState,
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" exact element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/feature"
            element={
              <RequireAuth>
                <Feature />
              </RequireAuth>
            }
          />
          <Route path="/signout" element={<Signout />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
