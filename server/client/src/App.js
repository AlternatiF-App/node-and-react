import React, {useEffect, createContext,  useReducer, useContext} from 'react';
import "./App.css"
import Home from  "./components/screens/Home"
import Register from './components/screens/Register';
import Login from './components/screens/Login';
import Navbar from "./components/Navbar"
import {BrowserRouter,  Route, Switch, useHistory} from 'react-router-dom'
import {reducer, initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload:user})
    }else{
      history.push("/login")
    }
  },[])
  
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
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
