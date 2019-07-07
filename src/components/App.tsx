import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Editor from './Editor';
import Result from './Result';
import Gallery from './Gallery';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <header className="app-header">React Imager</header>
      <Nav pills>
        <NavItem active>
          <NavLink tag={Link} to="/">
            Editor
          </NavLink>
        </NavItem>
        <NavItem active>
          <NavLink tag={Link} to="/gallery/">
            Gallery
          </NavLink>
        </NavItem>
      </Nav>
      <Route path="/" exact component={Editor} />
      <Route path="/result/" component={Result} />
      <Route path="/gallery/" component={Gallery} />
    </div>
  );
};

export default App;
