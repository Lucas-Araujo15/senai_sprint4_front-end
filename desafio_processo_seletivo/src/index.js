import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/home/App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import ListaGitHub from './pages/listaGithub/ListaGithub.jsx'
import NotFound from './pages/notFound/NotFound.jsx'

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/listagithub" component={ListaGitHub} />
        <Route path="/notfound" component={NotFound} />
        <Redirect to="/notfound" />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

reportWebVitals();
