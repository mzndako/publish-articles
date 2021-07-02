import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Article from './pages/Article/Article';

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/articles">
            <Article />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
