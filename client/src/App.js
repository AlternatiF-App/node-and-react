import React from 'react';
import "./App.css"
import Home from  "./components/screens/Home"
import Register from './components/screens/Register';
import Login from './components/screens/Login';
import Navbar from "./components/Navbar"
import {BrowserRouter,  Route, Switch} from 'react-router-dom'

const Routing = () => {
  
  return (
    <Switch>
        <Route exact path="/">
          <Navbar />
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
  )
}

function App() {
  return (
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
  );
}

export default App;
