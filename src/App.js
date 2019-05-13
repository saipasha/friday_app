import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import Profile from "./components/Profile";
import Users from './components/Users'
import { Route, Redirect } from 'react-router-dom'
import CharacterList from "./components/CharacterList";
import Paginated from "./components/Paginated";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <Redirect exact path='/' push='/login' /> */}
        <Route path='/login' component={Login} />
        <Route path='/profile' component={Profile} />
        <Route path='/users' component={Users} />
        <Route path='/characters' component={CharacterList} />
        <Route path='/paginated' component={Paginated} />
      </header>
    </div>
  );
}

export default App;
