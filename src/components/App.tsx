import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Editor from './Editor';
import Result from './Result';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <header className="app-header">React Imager</header>
      <Link to="/">Editor</Link>
      <Route path="/" exact component={Editor} />
      <Route path="/result/" component={Result} />
    </div>
  );
};

export default App;
