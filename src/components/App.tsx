import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Editor from './Editor';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <header className="app-header">React Imager</header>
      <Route path="/" exact component={Editor} />
    </div>
  );
};

export default App;
