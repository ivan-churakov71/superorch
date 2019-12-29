import React, { useState, useEffect } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import AuthContext from "./context/auth-context";

// Components
import Header from './components/Header';

// Views
import HomeView from "./views/home";
import AuthView from "./views/auth";

const { ipcRenderer: ipc } = window.require("electron");

function App() {

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
    setTokenExpiration(tokenExpiration);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setTokenExpiration(null);
  };

  useEffect(() => {
    console.log({token, userId, tokenExpiration});
  }, [token, userId, tokenExpiration]);

  return (
    <AuthContext.Provider value={{token, userId, tokenExpiration, login, logout }}>
      <HashRouter>
        <Header />
        {!token && <Redirect from="/" to="/auth" />}
        {!token && <Route path="/auth" exact component={AuthView} />}
        {token && <Redirect from="/auth" to="/" />}
        <Route path="/" exact component={HomeView} />
      </HashRouter>
    </AuthContext.Provider>
  );
}

export default App;
