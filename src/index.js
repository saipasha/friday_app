import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import generateStore from "./redux/store/createStore";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'
import { fetchUsersList } from './redux/actions/userActions'

export let store = generateStore()

fetchUsersList()(store.dispatch, store.getState)  // Asynchronous petition via redux at the launch of the app, such as bringing info like the rick and morty characters.
// This is a way of excecuting thunks where no component is done.

let WithStore = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<WithStore />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
