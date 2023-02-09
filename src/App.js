import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Game } from './pages/Game';
import { Login } from './pages/Login';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={ (p) => <Login { ...p } /> } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}